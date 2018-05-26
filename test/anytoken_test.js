
const BigNumber = require('bignumber.js');
const AnyToken = artifacts.require("./AnyToken.sol");

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      result.push(id + ": " + obj[id].toString());
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

contract("AnyToken", async (accounts) => {
  it("should create contract correctly", async () => {
    const instance = await AnyToken.deployed();

    assert(instance);
  });

  it("Mint Increasses supply", async () => {
    let instance = await AnyToken.deployed();
    await instance.mint.sendTransaction({from: accounts[0], value: 1});

    let totalSupply = await instance.totalSupply.call();
    assert.equal(totalSupply.toNumber(), 1);
  });
});
