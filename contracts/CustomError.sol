// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CustomError {
    uint256 public unlockTime;
    address payable public owner;

    error Unauthorized();
    error InvalidAmount(uint256 amount, address _address);

    function hello() public pure {
        revert Unauthorized();
    }

    function hi(uint256 amount) public view returns (bool) {
        // 10 wei
        if (amount > 10) {
            revert InvalidAmount(amount, msg.sender);
        }
        return true;
    }
}
