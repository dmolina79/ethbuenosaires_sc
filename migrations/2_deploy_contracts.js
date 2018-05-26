const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const CollectibleRegistry = artifacts.require("./CollectibleRegistry.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CollectibleRegistry);

  const CollectibleRegistry = CollectibleRegistry.deployed();
  deployer.deploy(RaffleFactory);
  deployer.deploy(Raffle);
  
};
