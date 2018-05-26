const AnyToken = artifacts.require("AnyToken");

contract("AnyToken", async accounts => {
  it("should create contract correctly", async () => {
    const instance = await AnyToken.deployed();

    assert(instance);
  });

  it("Mint Increasses supply", async accounts => {
    let instance = await AnyToken.deployed();
    //await instance.mint();
    let totalSupply = await instance.totalSupply();
    assert.equal(totalSupply, 1);
  });
});
