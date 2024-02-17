//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./TrackingToken.sol";

contract KGFGTokenFactory {
    address[] public deployedTokens;

    function createToken(address _owner, string[] memory _route) public returns (address) {
        address newToken = address(new KGFGTrackingToken(_owner, _route));
        deployedTokens.push(newToken);
		return (newToken);
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }
}