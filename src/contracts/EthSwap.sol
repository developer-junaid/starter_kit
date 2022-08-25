/* "SPDX-License-Identifier: UNLICENSED" */
pragma solidity ^0.5.16;

import "./Token.sol";

contract EthSwap {
    // Smart Contract Code
    string public name = "EthSwap Instant Exchange"; // State variable: Data is store in blockchain

    // 1.  Make Token Contract Code Accessible (CODE)
    Token public token; // State variable

    // 2. Tell current smart contract about where the token contract is located (ADDRESS)
    constructor(Token _token) public {
        // Runs only once when contract is deployed to blockchain
        token = _token; // 2. Local variable _token: Doesn't get store to blockchain
    }
}
