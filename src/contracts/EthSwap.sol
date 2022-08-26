/* "SPDX-License-Identifier: UNLICENSED" */
pragma solidity ^0.5.16;

import "./Token.sol";

contract EthSwap {
    // Smart Contract Code
    string public name = "EthSwap Instant Exchange"; // State variable: Data is store in blockchain

    // Rate of Token (Redemption Rate)
    // uint = Unsigned (+ve) Integer (No decimals)
    uint256 public rate = 100;

    // 1.  Make Token Contract Code Accessible (CODE)
    Token public token; // State variable

    // Event for Token Purchased
    // Args (account = who purchased tokens & calling the function, token = token address that was purchase, amount = amount of tokens purchased, rate = redemption rate of token)
    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    // 2. Tell current smart contract about where the token contract is located (ADDRESS)
    constructor(Token _token) public {
        // Runs only once when contract is deployed to blockchain
        token = _token; // 2. Local variable _token: Doesn't get store to blockchain
    }

    // Buy Tokens Function
    // Payable = allow us to send eth when we call it
    function buyTokens() public payable {
        // Redemption Rate: No of tokens they receive for 1 Ether
        // tokenAmount = Amount of Ethereum * Redemption Rate
        // msg.value = how much amount was sent when this function was called
        uint256 tokenAmount = msg.value * rate; // Transfer (to, amount) * From will be current contract that is EthSwap

        // require(condition) = if condition is true => Run the function else stop executing function and throw error
        // this = address of the smart contract (EthSwap)
        require(token.balanceOf(address(this)) >= tokenAmount);

        // msg.sender = it will be the recipient calling the function (msg is a global variable and .sender is address of the wallet calling the function)
        token.transfer(msg.sender, tokenAmount);

        // Emit the event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    // Sell Tokens
    function sellTokens(uint256 _amount) public {
        // Calculate amount of ether
        uint256 etherAmount = _amount / rate;

        // Require that EthSwap has enough Ether to redeem tokens
        require(address(this).balance >= etherAmount);

        // msg.sender = person calling function
        token.transferFrom(msg.sender, address(this), _amount); // Transfer tokens to smart contract
        msg.sender.transfer(etherAmount); // Send ether to the person calling function (sender)

        // Emit
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
