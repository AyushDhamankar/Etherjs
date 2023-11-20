// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sample {
    // State variable
    uint public data;

    // Read function
    function getData() public view returns (uint) {
        return data;
    }

    // Write function
    function setData(uint _newData) public {
        data = _newData;
    }

    // Payable function
    function sendEther(address account) public payable {
        payable(account).transfer(msg.value);
    }
}
