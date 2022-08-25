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

// Deployer: first ganache account
// Investor: token purchaser
contract("EthSwap", ([deployer, investor]) => {
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

  describe("buyTokens()", async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      }) // Test Transaction
    })

    it("Allows user to instantly purchase tokens from EthSwap for a fixed price", async () => {
      // Check investor recieved tokens after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens("100")) // Check if balance is 100 JUNI tokens

      // Check ethSwap contract balance after token purchase
      let ethSwapBalance
      ethSwapBalance = await token.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), tokens("999900")) // Check if 100 subtracted

      // Check if Ether Balance went up
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address) // function to check ethereum balance
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "Ether"))

      // Test Event
      const event = result.logs[0].args

      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount, tokens("100").toString())
      assert.equal(event.rate.toString(), "100")
    })
  })

  // it("contract has tokens", async () => {
  //   let balance = await token.balanceOf(ethSwap.address) // Get balance of ethswap contract
  //   assert.equal(balance.toString(), tokens("1000000")) // Check if it is equal to tokens sent
  // })
})
