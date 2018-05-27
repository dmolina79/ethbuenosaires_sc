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
const TEST_ASSET_BRIEF_DESCRIPTION = "This is an worthy token to win!";


contract('RaffleFactory', async (accounts) => {
  let factory;
  let token

  const org = accounts[0];

  beforeEach(async () => {
    factory = await RaffleFactory.deployed();
    token = await AnyToken.deployed();
  });

  it("should create Factory and ERC721 token correctly", async () => {
    assert(factory);
    assert(token)
  });

  it("Factory should create a Raffle", async () => {
    // Mint a new ERC721 token.
    await token.mint.sendTransaction({from: org, value: 1});
    // Obtain the address of the ERC721 token contract.
    const _erc721Address = await token.address;
    // Obtain the tokenId of the first token owned by the org.
    const _erc721TokenId = await token.tokenOfOwnerByIndex(org, 0);
    // Approve the factory to transfer the asset.
    await token.approve(factory.address, _erc721TokenId, {from: org});

    const tx = await factory.createNewRaffle(
      // Raffle data.
      TEST_TITLE, TEST_ORG_NAME, TEST_LENGTH, TEST_TICKET_PRICE,
      TEST_MAX_TICKETS, TEST_MIN_THRESHOLD,
      // Asset data.
      _erc721Address, _erc721TokenId,
      TEST_ASSET_PRICE, TEST_ASSET_BRIEF_DESCRIPTION);
    
    const event = tx.logs[0].event;
    const raffleAddress = tx.logs[0].args.raffleAddress;
    
    assert(event === 'RaffleCreated');
    assert(raffleAddress);

    const raffle = new Raffle(raffleAddress);

    // Check that the raffle owns the underlying token.
    const tokenOwner = await token.ownerOf(_erc721TokenId, {from: org});
    assert.strictEqual(tokenOwner, raffleAddress,
      "The underlying asset must belong to the raffle contract");

    // Check raffle data.
    assert.strictEqual(await raffle.title(), TEST_TITLE);
    assert.strictEqual(await raffle.orgName(), TEST_ORG_NAME);
    assert.strictEqual(
      (await raffle.length()).toNumber(), TEST_LENGTH);
    assert.strictEqual(
      (await raffle.ticketPrice()).toNumber(), TEST_TICKET_PRICE);
    assert.strictEqual(
      (await raffle.maxTickets()).toNumber(), TEST_MAX_TICKETS);
    assert.strictEqual(
      (await raffle.minThreshold()).toNumber(), TEST_MIN_THRESHOLD);

    // Check asset data.
    const asset = await raffle.selectedAsset();
    assert.strictEqual(asset[0], _erc721Address);
    assert.strictEqual(asset[1].toNumber(), _erc721TokenId.toNumber());
    assert.strictEqual(asset[2].toNumber(), TEST_ASSET_PRICE);
    assert.strictEqual(asset[3], TEST_ASSET_BRIEF_DESCRIPTION);
  });

});
