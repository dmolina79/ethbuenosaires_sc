var RaffleFactory = artifacts.require("./RaffleFactory.sol");
var Raffle = artifacts.require("./Raffle.sol");

module.exports = function(deployer) {
  deployer.deploy(RaffleFactory);
  deployer.deploy(Raffle);
};
