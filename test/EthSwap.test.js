const Token = artifacts.require("Token")
const EthSwap = artifacts.require("EthSwap")

// Configure Chai
require("chai")
  .use(require("chai-as-promised"))
  .should()

contract("EthSwap", (accounts) => {
  // Tests for EthSwap contract

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const token = await Token.new()
      const name = await token.name()
      assert.equal(name, "Junaid Token")
    })
  })

  // Test that smart contract was deployed
  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const ethSwap = await EthSwap.new()
      const name = await ethSwap.name()
      assert.equal(name, "EthSwap Instant Exchange")
    })
  })
})
