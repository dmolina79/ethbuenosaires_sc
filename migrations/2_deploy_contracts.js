const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");
const AnyToken = artifacts.require("./AnyToken.sol");

module.exports = function (deployer) {
  return deployer.deploy(CollectibleRegistry).then(async () => {
    const registry = await CollectibleRegistry.deployed();
    // deployer.deploy(RaffleFactory);
    await deployer.deploy(RaffleFactory, registry.address);
    await deployer.deploy(AnyToken);

    const token = await AnyToken.deployed();
    console.info("---setting AnyToken to Registry with address:", token.address);
    await registry.addCollectibleContract('AnyToken', token.address);
  });  
};
