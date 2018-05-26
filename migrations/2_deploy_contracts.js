var RaffleFactory = artifacts.require("./RaffleFactory.sol");
var Raffle = artifacts.require("./Raffle.sol");
var AnyToken = artifacts.require("./AnyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(RaffleFactory);
  deployer.deploy(Raffle);
  deployer.deploy(AnyToken);
};
