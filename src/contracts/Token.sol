pragma solidity ^0.5.0;

contract Token {
    string public name = "Junaid Token";
    string public symbol = "JUNI";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens // Total tokens
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Returns Balance you have (tokens)
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Run when contract is deployed to blockchain
    constructor() public {
        balanceOf[msg.sender] = totalSupply; // Assign all the tokens to smart contract deployer (first ganache account will have 1 million tokens)
    }

    // Send Token from one person to another
    // args (address of reciever, amount)
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // Let somebody else spend your tokens
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
