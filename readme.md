## Unit (1 Ether)

- 1 USD = 100 Cents
- 1 Ether = 1000000000000000000 Wei (18 decimals)

## Steps

1. Install dependencies

- node js
- npm
- ganache (one click blockchain)
- chai, chai-as-promised
- truffle
- metamask wallet
- web3

2. Project Setup

- Clone template
- Make sure truffle config is connected to ganache and paths are correct

3. Blockchain Setup

- contracts/NewContractFile.sol (Write your contract here)
- migrations/NewMigration.js (Write deployer for your contract)
- Run `truffle migrate` (Contract should be deployed and ganache balance should go down)
- Interact with Contract using `truffle console`

4. Create ERC-20 Token

- Create contracts/Token.sol (Paste Dapptoken.sol file here) - modify according to needs
- Write deployer in existing migration file or create a new one
- Run `truffle migrate --reset` (to clone that code and update) or `truffle migrate` (Deploy new)
- Interact with it `truffle console` or you can write the same code in migration file

5. Create Tests

- File test/NewContractFile.test.js (Write tests here)
- _You should have chai installed_
- Run `truffle test` (To run tests)

6. Create Buy Token Functionality (Interact with Token SC from EthSwap SC)

- go to contracts/EthSwap.sol
- Import Token smart contract (at the top of contract)
- check code is good: `truffle compile`
- // 1. Make Token Contract Code Accessible (CODE)
- // 2. Tell current smart contract about where the token contract is located (ADDRESS) (In Constructor)
- // 3. Token address to deploy that as well (2_deploy_contracts.js)
- // 4. Update test with token address (EthSwap.test.js)
- Run test 