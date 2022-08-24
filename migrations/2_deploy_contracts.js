// Deploy smart contracts here
// const { artifacts } = require("truffle")
const Token = artifacts.require("Token")
const EthSwap = artifacts.require("EthSwap")

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token)
  const token = await Token.deployed()

  // Deploy Smart Contract to Swap
  await deployer.deploy(EthSwap)
  const ethSwap = await EthSwap.deployed()

  // Transfer all tokens to EthSwap (1 million)
  await token.transfer(ethSwap.address, "1000000000000000000000000")
}
