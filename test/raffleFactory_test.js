const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");
const AnyToken = artifacts.require("./AnyToken.sol");

contract('RaffleFactory', async (accounts) => {
  let factory;
  let token;

  const org = accounts[0];
  const player1 = accounts[1];
  const player2 = accounts[2];
  //const tokenId = 1;


  beforeEach(async ()=> {
    factory = await RaffleFactory.deployed();
    token = await AnyToken.deployed();
  });

  it("should create Factory correctly", async () => {
    assert(factory);
    assert(token);
  });

  it("Factory should create a Raffle", async () => {
    const tokenId = await token.tokenOfOwnerByIndex(org, 0);

    console.log('Printed TokenId', tokenId.toNumber());

    const tx = await factory.createNewRaffle('AnyToken', 1, {from: org});
    
    const event = tx.logs[0].event;
    const raffleAddress = tx.logs[0].args.raffleAddress;
    
    console.log('event', event, 'RaffleAddress', raffleAddress);

    assert(event === 'RaffleCreated');
    assert(raffleAddress);
  });

});
