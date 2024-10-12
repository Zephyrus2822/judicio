// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BailContract {
    struct Bail {
        uint id;
        string crime;
        string section;
        string bailStatus;
        string bailAmount;
        string duration;
    }

    Bail[] public bails;

    function addBail(
        uint _id,
        string memory _crime,
        string memory _section,
        string memory _bailStatus,
        string memory _bailAmount,
        string memory _duration
    ) public {
        bails.push(Bail(_id, _crime, _section, _bailStatus, _bailAmount, _duration));
    }

    function getBail(uint _id) public view returns (Bail memory) {
        return bails[_id];
    }

    function totalBails() public view returns (uint) {
        return bails.length;
    }
}
