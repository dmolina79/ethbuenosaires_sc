const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const AnyToken = artifacts.require("./AnyToken.sol");


// Test raffle data.
const TEST_TITLE = "A NEW RAFFLE"
const TEST_ORG_NAME = "ACME, Inc."
const TEST_LENGTH = 6
const TEST_TICKET_PRICE = 1
const TEST_MAX_TICKETS = 5
const TEST_MIN_THRESHOLD = 2

// Test asset data. Contract address and toke ID will come from the sample
// ERC721 contract token.
const TEST_ASSET_PRICE = 256;
const TEST_BRIEF_DESCRIPTION = "This is an worthy token to win!";


contract('Raffle', async (accounts) => {

  it("Raffle data match", async () => {
    let anyToken = await AnyToken.deployed();
    await anyToken.mint.sendTransaction({from: accounts[0], value: 1});
    const remoteContractAddr = await anyToken.address;
    const tokenId = 0;

    const raffleFactory = await RaffleFactory.deployed();
    assert(raffleFactory);

    const tx = await raffleFactory.createNewRaffle(
      // Raffle data.
      TEST_TITLE, TEST_ORG_NAME, TEST_LENGTH, TEST_TICKET_PRICE,
      TEST_MAX_TICKETS, TEST_MIN_THRESHOLD,
      // Asset data.
      remoteContractAddr, tokenId,
      TEST_ASSET_PRICE, TEST_BRIEF_DESCRIPTION);
    
    const raffleAddress = tx.logs[0].args.raffleAddress;

    assert(raffleAddress)
    console.log("raffleAddr");

    console.log(raffleAddress);
    
    const raffle = new Raffle(raffleAddress);
    assert.strictEqual(await raffle.title(), TEST_TITLE);
  });

});
