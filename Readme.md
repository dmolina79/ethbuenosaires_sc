#Hack Eth BsAs

#install dependencies
npm install

#Compile
truffle compile

#rebuild on problems
truffle migrate --reset --all --network ganache

#having problems?
rm -r build/
truffle compile
truffle migrate --network ganache

#tools for contracts and debug

#remix-ide
´´´
npm install remix-ide -g
remix-ide
´´´

#truffle flattener 
´´´
npm install truffle-flattener -g
truffle-flattener contracts/RaffleFactory.sol > debug/DebugFactory.sol
´´´


#// Serves the front-end on http://localhost:3000
npm run start

npm install -g truffle

Uses:
https://github.com/truffle-box/react-box

Install Ganache:
http://truffleframework.com/ganache/

