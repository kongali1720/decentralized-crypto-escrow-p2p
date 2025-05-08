// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    enum Status { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, REFUNDED }

    address public buyer;
    address public seller;
    address public arbiter;
    uint public amount;
    Status public status;

    constructor(address _buyer, address _seller, address _arbiter) payable {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        amount = msg.value;
        status = Status.AWAITING_DELIVERY;
    }

    function releaseFunds() external {
        require(msg.sender == buyer || msg.sender == arbiter, "Not authorized");
        require(status == Status.AWAITING_DELIVERY, "Wrong status");
        status = Status.COMPLETE;
        payable(seller).transfer(amount);
    }

    function refundBuyer() external {
        require(msg.sender == seller || msg.sender == arbiter, "Not authorized");
        require(status == Status.AWAITING_DELIVERY, "Wrong status");
        status = Status.REFUNDED;
        payable(buyer).transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
