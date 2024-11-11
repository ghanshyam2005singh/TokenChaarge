// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ChargeContract {
    string public name = "Wicoin";
    string public symbol = "WCN";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Recharge(address indexed account, uint256 amount);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * (10 ** uint256(decimals));
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function recharge(address account, uint256 amount) public {
        balanceOf[account] += amount;
        emit Recharge(account, amount);
    }
}
