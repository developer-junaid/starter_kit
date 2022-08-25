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
    event TokenPurchased(
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

        // msg.sender = it will be the recipient calling the function (msg is a global variable and .sender is address of the wallet calling the function)
        token.transfer(msg.sender, tokenAmount);

        // Emit the event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
}
