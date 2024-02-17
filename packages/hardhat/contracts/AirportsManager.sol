//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./TrackingToken.sol";
import "./TokenFactory.sol";

contract AirportsManager {
	address public immutable owner;
	string[] public airports;

	struct AirportData {
		uint256	balance;
		uint256	margin;
		uint256	debt;
	}

	mapping(string => AirportData) public airports_dict;

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

	function airportExists(string memory _airportCode) private view returns (bool) {
		if (airports_dict[_airportCode].balance != 0)
			return (true);
		return (false);
	}

	function addAirport(string memory _airportCode, uint256 _amount, uint256 _percentage) public {
		require (!airportExists(_airportCode), "Duplicate airport");
		airports_dict[_airportCode] = AirportData(_amount, _percentage, 0);
		airports.push(_airportCode);
		emit AirportAdded(_airportCode);
	}

	function removeAirport(string memory _airportCode) public {
		uint256 airportIndex = findAirportIndex(_airportCode);
		if (airportIndex == airports.length) revert();
		delete airports_dict[_airportCode];
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

	function updateTokenState(string memory _airportCode, string memory _newState, address _tokenAddress) public payable {
		uint256 initGas = gasleft();
		KGFGTrackingToken token = KGFGTrackingToken(_tokenAddress);
		token.updateState(_newState, _airportCode);
		uint256 endGas = gasleft();
		airports_dict[_airportCode].debt += (initGas - endGas); //  * tx.gasprice;
	}

	// BUG: Unreasonably expensive
	function createToken(address _factoryAddress, address _tokenOwner, string[] memory _route) public payable {
		uint256 initGas = gasleft();
		KGFGTokenFactory factory = KGFGTokenFactory(_factoryAddress);
		factory.createToken(_tokenOwner, _route);
		uint256 endGas = gasleft();
		airports_dict[_route[0]].debt += (initGas - endGas); //  * tx.gasprice;
	}

	receive() external payable {}
}

// 0.000191130056034759