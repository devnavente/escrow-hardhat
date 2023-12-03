// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;

    bool public isApproved;

    event Approved(uint _balance);

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        beneficiary = _beneficiary;
        arbiter = _arbiter;
    }

    function approve() external {
        require(msg.sender == arbiter);

        uint balance = address(this).balance;
        
        (bool success, ) = beneficiary.call{value: balance}("");
        require(success, "Failed to send Ether");

        isApproved = true;

        emit Approved(balance);
    }
}
