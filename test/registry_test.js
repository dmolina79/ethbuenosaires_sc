const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");
const AnyToken = artifacts.require("./AnyToken.sol");

contract('Collectible Registry', async (accounts) => {
  let registry;
  let anyToken;

  beforeEach(async ()=> {
    registry = await CollectibleRegistry.deployed();
    anyToken = await AnyToken.deployed();
  });

  it("should create contract correctly", async () => {
    assert(registry);
  });

  it("should have AnyToken in Registry", async () => {
    assert(anyToken);

    const tokenAddress = await registry.getCollectibleContract('AnyToken');

    console.info('tokenAddress', tokenAddress, 'deployed token address', anyToken.address);
    assert(tokenAddress === anyToken.address, 'Should have token in registry');
  });

});