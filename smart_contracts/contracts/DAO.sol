// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    address[] approved;
    address public owner;
    address[] public members;
    uint256 public rewardAmount;
    uint capacity;
    
    constructor(uint256 _rewardAmount, uint _capacity) payable  {
        require(msg.value == _rewardAmount);
        owner = msg.sender;
        rewardAmount = _rewardAmount;
        capacity = _capacity;
    }
    
    function joinDAO() external {
        require(members.length < capacity, "DAO is full");
        members.push(msg.sender);
    }
    
    function sendReward(address payable[] memory eligibleMembers) external payable{
        require(msg.sender == owner, "Only owner can disburse rewards");
        require(eligibleMembers.length <= members.length, "Eligible should be less than contributers");
        uint amount = (rewardAmount)/(eligibleMembers.length);
        for (uint256 i = 0; i < eligibleMembers.length; i++) {
            eligibleMembers[i].transfer(amount);
        }
    }

}