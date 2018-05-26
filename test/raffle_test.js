var Raffle = artifacts.require("./Raffle.sol");

contract('Raffle', async (accounts) => {

  it("should create contract correctly", async () => {
    const instance = await Raffle.deployed();

    assert(instance);
  });

});
