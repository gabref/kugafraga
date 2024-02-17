// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "hardhat/console.sol";

contract KGFGTrackingToken {
    address public				owner;
    string[] public				route;
    string public				symbol;
    string public				state;
    string public				location;
	uint public					lastModified;
	uint public					createdAt;

    constructor(address _owner, string[] memory _route) {
        owner = _owner;
        route = _route;
        symbol = "KGFGTT";
		state = "checked-in";
		location = route[0];
		createdAt = block.timestamp;
		lastModified = createdAt;
		console.log("[*] Token deployed");
    }

	function updateState(string memory _newState, string memory _location) public {
		state = _newState;
		location = _location;
		lastModified = block.timestamp;

		console.log("[*] State changed");
		console.log("Owner: ", owner);
		console.log("Origin: ", route[0]);
		console.log("Symbol: ", symbol);
		console.log("State: ", retrieveState());
		console.log("Location: ", location);
		console.log("Created at: ", createdAt);
		console.log("Last modified: ", lastModified);
	}

	function retrieveState() public view returns (string memory) {
		string memory ret = string.concat(state, " at ");
		return string.concat(ret, location);
	}

	function retrieveRoute() public view returns (string[] memory) {
		return (route);
	}
}