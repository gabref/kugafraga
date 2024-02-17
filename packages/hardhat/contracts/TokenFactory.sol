//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./TrackingToken.sol";

contract KGFGTokenFactory {
    address[] public deployedTokens;

    function createToken(address _owner, string memory _origin, string memory _destination) public {
        address newToken = address(new KGFGTrackingToken(_owner, _origin, _destination));
        deployedTokens.push(newToken);
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }
}