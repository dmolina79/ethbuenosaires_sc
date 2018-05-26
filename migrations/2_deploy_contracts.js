const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");
const AnyToken = artifacts.require("./AnyToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CollectibleRegistry);

  const registry = await CollectibleRegistry.deployed();
  // deployer.deploy(RaffleFactory);
  await deployer.deploy(RaffleFactory, registry.address);
  await deployer.deploy(Raffle);
  await deployer.deploy(AnyToken);
};
