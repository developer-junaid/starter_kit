// Deploy smart contracts here
// const { artifacts } = require("truffle")
const EthSwap = artifacts.require("EthSwap")

module.exports = function(deployer) {
  deployer.deploy(EthSwap)
}
