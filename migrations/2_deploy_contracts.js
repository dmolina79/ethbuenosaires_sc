const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CollectibleRegistry);

  const CollectibleRegistry = CollectibleRegistry.deployed();
  // deployer.deploy(RaffleFactory);
  await deployer.deploy(RaffleFactory, CollectibleRegistry.address);
  await deployer.deploy(Raffle);
  
};
