//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./TrackingToken.sol";
import "./TokenFactory.sol";
import "./TokenData.sol";

contract AirportsManager {
	address public immutable owner;
	string[] public airports;
	address public factoryAddress;
	uint256 private	margin = 50;
	string[6] states = ["CHECK-IN", "LOADING", "LOADED", "UNLOADING", "UNLOADED", "READY TO BE COLLECTED"];

	struct CheckpointData {
		string state;
		string airportCode;
	}

	struct AirportData {
		address payable airportAddress;
		uint256	balance;
		uint256	margin;
	}

	struct DebtData {
		string[] route;
		uint256 total;
		uint256[] fees;
	}

	// Dict of airports
	mapping(string => AirportData) public airports_dict;

	// Dict of checkpoints
	mapping(address => CheckpointData) public checkpoints_dict;

	// Dict of token addresses with debts
	mapping(address => mapping(string => uint256)) debts;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event AirportAdded(
		string airportCode
	);

	event AirportRemoved(
		string airportCode
	);

	constructor(address _owner, address _factoryAddress) {
		owner = _owner;
		factoryAddress = _factoryAddress;
	}

	function retrieveFactoryAddress() public view returns (address) {
		return (factoryAddress);
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

	function addAirport(address payable _airportAddress, string memory _airportCode, uint256 _amount, uint256 _percentage) external {
		require (!airportExists(_airportCode), "Duplicate airport");
		airports_dict[_airportCode] = AirportData(_airportAddress, _amount, _percentage);
		airports.push(_airportCode);
		emit AirportAdded(_airportCode);
	}

	function removeAirport(string memory _airportCode) external {
		uint256 airportIndex = findAirportIndex(_airportCode);
		if (airportIndex == airports.length) revert();
		delete airports_dict[_airportCode];
		remove(airportIndex);
		emit AirportRemoved(_airportCode);
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

	function random(uint _range) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty,
        msg.sender))) % _range;
    }

	function updateTokenState(address _tokenAddress) public {
		uint256 initGas = gasleft();
		KGFGTrackingToken token = KGFGTrackingToken(_tokenAddress);
		token.updateState(states[random(states.length)], airports[random(airports.length)]);
		uint256 endGas = gasleft();
		debts[_tokenAddress][checkpoints_dict[msg.sender].airportCode] += (initGas - endGas);
	}

	function createToken(string[] memory _route) public {
		uint256 initGas = gasleft();
		KGFGTokenFactory factory = KGFGTokenFactory(factoryAddress);
		address tokenAddress = factory.createToken(msg.sender, _route);
		uint256 endGas = gasleft();
		debts[tokenAddress][_route[0]] += (initGas - endGas);
	}

	function calculateTotalDebt(address _tokenAddress) public view returns (DebtData memory) {
		uint256 initGas = gasleft();
		KGFGTrackingToken token = KGFGTrackingToken(_tokenAddress);
		string[] memory route = token.retrieveRoute();
		uint256[] memory fees = new uint256[](route.length);
		uint256 totalDebt = 0;
		uint256 i = 0;
		while (i < route.length) {
			totalDebt += debts[_tokenAddress][route[i]];
			fees[i] = debts[_tokenAddress][route[i]];
			i++;
		}
		DebtData memory debtData = DebtData(route, (totalDebt + (initGas - gasleft())) * ((100 + margin) / 100), fees);
		return (debtData);
	}

	function payBackDebt(address _tokenAddress) public payable {
		DebtData memory debtData = calculateTotalDebt(_tokenAddress);
		uint256 totalDebt = debtData.total * (10 ** 9);
		require(msg.value >= (debtData.total * (10 ** 9)), "The amount is not equal to the total."); // TODO: Change to "=="
		for (uint256 i = 0; i < debtData.fees.length; i++) {
			address payable apAddress = airports_dict[debtData.route[i]].airportAddress;
			uint256 fee = debtData.fees[i] * (10 ** 9) * ((100 + airports_dict[debtData.route[i]].margin) / 100); // TEST
			totalDebt -= fee;
			bool sent = apAddress.send(fee);
        	require(sent, "Failed to send Ether");
			debts[_tokenAddress][debtData.route[i]] = 0;
		}
	}

	function retrieveSendersTokens(address _userAddress) public view returns (TokenData[] memory) {
		KGFGTokenFactory tokenFactory = KGFGTokenFactory(factoryAddress);
		address[] memory userTokens = tokenFactory.getUserTokens(_userAddress);
		TokenData[] memory tokenDetails = new TokenData[](userTokens.length);
		for (uint256 i = 0; i < userTokens.length; i++) {
			KGFGTrackingToken temp = KGFGTrackingToken(userTokens[i]);
			tokenDetails[i] = temp.retrieveTokenData();
		}
		return (tokenDetails);
	}

	receive() external payable {}
}
