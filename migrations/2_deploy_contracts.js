const RaffleFactory = artifacts.require("./RaffleFactory.sol");
const Raffle = artifacts.require("./Raffle.sol");
const AnyToken = artifacts.require("./AnyToken.sol");

module.exports = function (deployer) {
  return deployer.deploy(AnyToken).then(async () => {
    await deployer.deploy(RaffleFactory);
  });  
};
