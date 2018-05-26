var CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");

contract('Collectible Registry', async (accounts) => {

  it("should create contract correctly", async () => {
    const instance = await CollectibleRegistry.deployed();

    assert(instance);
  });

});