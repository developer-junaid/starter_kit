const Token = artifacts.require("Token")
const EthSwap = artifacts.require("EthSwap")

// Configure Chai
require("chai")
  .use(require("chai-as-promised"))
  .should()

// Function for converting tokens to wei
function tokens(n) {
  return web3.utils.toWei(n, "ether")
}

contract("EthSwap", (accounts) => {
  // Tests for EthSwap contract
  let token, ethSwap

  // Before hook for variables
  before(async () => {
    token = await Token.new()
    ethSwap = await EthSwap.new(token.address) // 4. Update test with token address

    await token.transfer(ethSwap.address, tokens("1000000")) // Transfer tokens from token contract to ethswap contract
  })

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name()
      assert.equal(name, "Junaid Token")
    })
  })

  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await ethSwap.name()
      assert.equal(name, "EthSwap Instant Exchange")
    })
  })

  it("contract has tokens", async () => {
    let balance = await token.balanceOf(ethSwap.address) // Get balance of ethswap contract
    assert.equal(balance.toString(), tokens("1000000")) // Check if it is equal to tokens sent
  })
})
