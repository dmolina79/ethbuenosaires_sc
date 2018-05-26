var RaffleFactory = artifacts.require("./RaffleFactory.sol");

contract('RaffleFactory', async (accounts) => {
  let contract;

  const org = accounts[0];
  const player1 = accounts[1];
  const player2 = accounts[2];


  beforeEach(async ()=> {
    contract = await RaffleFactory.deployed();
  });

  it("should create Factory correctly", async () => {
    assert(contract);
  });

  it("Factory should create a Raffle", async () => {
    const contract = await RaffleFactory.deployed();

    const tx = await contract.createNewRaffle({from: org});
    
    const event = tx.logs[0].event;
    const raffleAddress = tx.logs[0].args.raffleAddress;
    
    console.log('event', event, 'RaffleAddress', raffleAddress);

    assert(event === 'RaffleCreated');
    assert(raffleAddress);
  });

});
