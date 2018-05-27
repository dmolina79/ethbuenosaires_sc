const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const AnyToken = artifacts.require("./AnyToken.sol");
const BigNumber = require('bignumber.js');

// Test raffle data.
const TEST_TITLE = "A NEW RAFFLE"
const TEST_ORG_NAME = "ACME, Inc."
const TEST_LENGTH = 6
const TEST_TICKET_PRICE = web3.toWei(0.01, 'ether')
const TEST_MAX_TICKETS = 5
const TEST_MIN_THRESHOLD = 2

// Test asset data. Contract address and toke ID will come from the sample
// ERC721 contract erc721Token.
const TEST_ASSET_PRICE = 256;
const TEST_ASSET_BRIEF_DESCRIPTION = "This is a worthy erc721Token to win!";
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";


contract('Raffle', async (accounts) => {
  const org = accounts[0];
  const player1 = accounts[1];
  const player2 = accounts[2];
  const player3 = accounts[3];
  const player4 = accounts[4];
  const nonPlayer = accounts[5];
  const registeredPlayers = [player1, player2, player3, player4];

  let raffle;
  let erc721Token;
  
  beforeEach(async () => {
    const factory = await RaffleFactory.deployed();
    erc721Token = await AnyToken.deployed();

    // Mint a new ERC721 erc721Token.
    await erc721Token.mint({from: org, value: 1});
    // Obtain the address of the ERC721 erc721Token contract.
    const erc721Address = await erc721Token.address;
    // Obtain the tokenId of the first erc721Token owned by the org.
    const erc721TokenId = await erc721Token.tokenOfOwnerByIndex(org, 0);
    // Approve the factory to transfer the asset.
    await erc721Token.approve(factory.address, erc721TokenId, {from: org});

    const tx = await factory.createNewRaffle(
      // Raffle data.
      TEST_TITLE, TEST_ORG_NAME, TEST_LENGTH, TEST_TICKET_PRICE,
      TEST_MAX_TICKETS, TEST_MIN_THRESHOLD,
      // Asset data.
      erc721Address, erc721TokenId,
      TEST_ASSET_PRICE, TEST_ASSET_BRIEF_DESCRIPTION);
    
    raffle = new Raffle(tx.logs[0].args.raffleAddress);
    for (var i = 0, len = registeredPlayers.length; i < len; i++) {
      await raffle.buyTicket({
        from: registeredPlayers[i],
        value: TEST_TICKET_PRICE
      });
    }
  });

  it("should create raffle correctly", async () => {
    assert(raffle);
  });

  it("ticket buyers should be registered players", async () => {
    assert.strictEqual(
      (await raffle.getPlayerCount()).toNumber(), registeredPlayers.length,
      "Incorrect number of expected registered players");
    const rafflePlayers = await raffle.getPlayers();
    assert.deepEqual(rafflePlayers, registeredPlayers,
      "The set of registered players is incorrect");
  });

  it("the raffle must not have any predefined winner", async () => {
    const winner = await raffle.winner();
    assert.strictEqual(winner, NULL_ADDRESS);
  });

  it("the picked winner must be one of the registered players", async () => {
    await raffle.pickWinner();
    const winner = await raffle.winner();

    assert.notEqual(winner, NULL_ADDRESS);
    assert(registeredPlayers.includes(winner),
      "The winner must be in the registered players set");
  });

  it("the picked winner should own the asset", async () => {
    const asset = await raffle.selectedAsset();
    const erc721TokenId = asset[1].toNumber();

    const currentOwner = await erc721Token.ownerOf(erc721TokenId);

    await raffle.pickWinner();
    const winner = await raffle.winner();

    const newOwner = await erc721Token.ownerOf(erc721TokenId);

    assert.notEqual(newOwner, currentOwner,
      "Owners must not be the same after picking a winner");
    assert.strictEqual(newOwner, winner,
      "The raffle's winner must be the new owner of the asset");
  });

  it("spending the ticket price when buying is enforced", async () => {
    var callFailed = false

    // Invoke buyTicket with one wei less than the ticket price.
    const inssuficientAmountToSpend = new BigNumber(TEST_TICKET_PRICE).minus(1);
    try {
      await raffle.buyTicket({
        from: player1,
        value: inssuficientAmountToSpend
      });
    } catch {
      callFailed = true;
    }
    assert.strictEqual(callFailed, true,
      "Calling buyTicket with inssuficient funds must have failed")
  });

  it("cannot buy more tickets than allowed", async () => {
    var callFailed = false

    await raffle.buyTicket({
      from: player1,
      value: TEST_TICKET_PRICE
    });

    // Test we have reached the max number of sold tickets.
    assert.strictEqual(
      (await raffle.getPlayerCount()).toNumber(),
      TEST_MAX_TICKETS);

    try {
      await raffle.buyTicket({
        from: player1,
        value: TEST_TICKET_PRICE
      });
    } catch {
      callFailed = true;
    }
    assert.strictEqual(callFailed, true,
      "Calling buyTicket exceeding the maximum number tickets to sell must have failed");
  });

});
