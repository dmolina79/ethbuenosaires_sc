var RaffleFactory = artifacts.require("./RaffleFactory.sol");

contract('RaffleFactory', async (accounts) => {
  let contract;

  beforeEach(async ()=> {
    contract = await RaffleFactory.deployed();
  });

  it("should create Factory correctly", async () => {
    assert(contract);
  });

  it("Factory should create a Raffle", async () => {
    const contract = await RaffleFactory.deployed();

    assert(contract);
  });

});
