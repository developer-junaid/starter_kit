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

6. Connect both contracts (Interact with Token SC from EthSwap SC)

- go to contracts/EthSwap.sol
- Import Token smart contract (at the top of contract)
- check code is good: `truffle compile`
- // 1. Make Token Contract Code Accessible (CODE)
- // 2. Tell current smart contract about where the token contract is located (ADDRESS) (In Constructor)
- // 3. Token address to deploy that as well (2_deploy_contracts.js)
- // 4. Update test with token address (EthSwap.test.js)
- Run test

7. Create BuyToken Functionality

- Set Redemption rate (.sol)
- Get msg.value and msg.sender (.sol)
- Call the transfer function (.sol)
- Compile the contract `truffle compile`
- Write the test (that tokens were transferred to address and ether was transfer to us(contract)) (.test.js)
- Write Events & Emit(.sol)
- Test the events (.test.js)
- Require (check that tokens are available in exchange) (.sol)

8. Create Sell Token Functionality

- Get amount from user (.sol)
- calculate ether amount (.sol)
- TransferFrom function to let smart contract spend user's tokens (.sol)
- TransferFrom must be approved (We will do it from frontend)
- Create test (.test.js)
- Write Event & Emit (.sol)
- Write Event Test (.test.js)

9. Deploy Smart Contract

- `truffle migrate --reset` (deploy to ganache)
- you will have abis in src/abis

10. _Connect Frontend to Blockchain_

- Connect Browser to blockchain (Metamask)
- - Add Custom RPC (metamask)
- - Network Name: Ganache
- - New RPC Url: http://localhost:7545/
- - Click Save
- - Click Network and It's selected
- - Import Account (click private key and paste key of first ganache account)

- Connect App to blockchain
- - import web3
- - load web3 (get web3 in our app)
- - load blockchain data (get connected account)
- - get balance

- Add Identicons

- Buy Tokens Frontend
- - Get token abi
- - Get smart contract abi
- - Load Token
- - Load EthSwap

11. Deploy Contract to Alchemy

- Signup to Alchemy
- create .env and store API_KEY and Your metamast Private key & install `npm i dotenv`
- Install hardhat `npm i --save-dev hardhat`
- Create empty hardhat project `npx hardhat` & Select `Create an empty hardhat.config.js` & press `Enter`
- Install ethers js `npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"`
- Add ethers in hardhat config (update according to file)
- Compile contract `npx hardhat compile`

12. Deployments

- JUNI Token Contract Address: 0xA2fF74a9E679D9d596A274b7de0483034eB36b96
- EthSwap Contract Address: 0x36268413f0230800355CD4c32d81F60dD211bfF0
