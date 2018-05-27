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

  beforeEach(async () => {
    factory = await RaffleFactory.deployed();
    token = await AnyToken.deployed();
  });

});
