//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract AirportsManager {
	address public immutable owner;
	string[] public airports;
	mapping(string => uint256) public airports_dict;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event AirportAdded(
		string airportCode
	);

	event AirportRemoved(
		string airportCode
	);

	constructor(address _owner) {
		owner = _owner;
	}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function addAirport(string memory _airportCode) public isOwner {
		airports_dict[_airportCode] = 1 ether;
		airports.push(_airportCode);
		emit AirportAdded(_airportCode);
	}

	function removeAirport(string memory _airportCode) public isOwner {
		uint256 airportIndex = findAirportIndex(_airportCode);
		if (airportIndex == airports.length) revert();
		airports_dict[_airportCode] = 0;
		remove(airportIndex);
		emit AirportAdded(_airportCode);
	}

	function findAirportIndex(string memory _airportCode) private view returns (uint256) {
		for (uint256 i = 0; i < airports.length; i++) {
            if (compareStrings(airports[i], _airportCode))
				return (i);
        }
		return (airports.length);
	}

	function compareStrings(string memory a, string memory b) private pure returns (bool) {
		return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
	}

	function retrieveAirports() public view returns (string[] memory) {
		return (airports);
	}

	function remove(uint256 index) private returns (string[] memory) {
		delete airports[index];
        for (uint i = index; i < airports.length - 1; i++) {
            airports[i] = airports[i+1];
        }
		airports.pop();
        return airports;
    }

	receive() external payable {}
}
