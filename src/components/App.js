import React, { Component } from "react"

// Web3
import Web3 from "web3"

// Components
import Navbar from "./Navbar"

// Styles
import "./App.css"

class App extends Component {
  // CONSTRUCTOR for state (Run when component is created)
  constructor(props) {
    super(props) // calls the function on code from where it inherits
    this.state = {
      account: "", // Set default state
      ethBalance: "0",
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

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Hello World !</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
