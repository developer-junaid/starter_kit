import React, { Component } from "react"

// Web3
import Web3 from "web3"

// ABIs
import EthSwapContract from "../abis/EthSwap.json"
import TokenContract from "../abis/Token.json"

// Components
import Navbar from "./Navbar"
import Main from "./Main"

// Styles
import "./App.css"

class App extends Component {
  // CONSTRUCTOR for state (Run when component is created)
  constructor(props) {
    super(props) // calls the function on code from where it inherits
    this.state = {
      account: "", // Set default state
      token: {},
      ethSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
      loading: true,
    }
  }

  // Runs when component mounts towards virtual DOM (calls before render html)
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance: ethBalance })
    console.log(this.state.ethBalance)

    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData = TokenContract.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(TokenContract.abi, tokenData.address)
      this.setState({ token })

      // call() => fetch information from blockchain
      // send() => putting new data on blockchain (update blockchain, transactions)
      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call() // Balance of the persons account in tokens
      this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert("Token Contract not deployed to detected network.")
    }

    // Load EthSwap
    const ethSwapData = EthSwapContract.networks[networkId]

    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(
        EthSwapContract.abi,
        ethSwapData.address
      )
      this.setState({ ethSwap })
    } else {
      window.alert("EthSwap Contract not deployed to detected network.")
    }

    // Loading complete
    this.setState({ loading: false })
  }

  // Buy Tokens
  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.ethSwap.methods
      .buyTokens()
      .send({ from: this.state.account, value: etherAmount })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false })
      })
  }

  // Buy Tokens
  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods
      .approve(this.state.ethSwap.address, tokenAmount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false })
          })
      })
  }

  // Load Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying Metamask"
      )
    }
  }

  render() {
    console.log(this.state.account)
    let content

    if (this.state.loading) {
      content = (
        <p id="loading" className="text-center">
          Loading...
        </p>
      )
    } else {
      content = (
        <Main
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />
      )
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">{content}</div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
