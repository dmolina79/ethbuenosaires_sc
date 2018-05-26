
const BigNumber = require('bignumber.js');
const AnyToken = artifacts.require("./AnyToken.sol");

contract("AnyToken", async accounts => {
  xit("should create contract correctly", async () => {
    const instance = await AnyToken.deployed();

    assert(instance);
  });

  xit("Mint Increasses supply", async accounts => {
    let instance = await AnyToken.deployed();
    await instance.mint();
    let totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 1);
  });
});
