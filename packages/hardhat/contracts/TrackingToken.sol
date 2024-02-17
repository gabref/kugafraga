// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract KGFGTrackingToken {
    address public				owner;
    string public				origin;
    string public				destination;
    string public				symbol;
    uint private					state;
	uint public					lastModified;
	uint public					createdAt;
	
	// struct FeeDetails {
	// 	address	addr;
	// 	uint256	value;
	// }

	// mapping(uint256 => FeeDetails) public fees;
	// uint256[] public fees_result;

    constructor(address _owner, string memory _origin, string memory _destination) {
        owner = _owner;
        origin = _origin;
		destination = _destination;	
        symbol = "KGFGTT";
		state = 0;
		createdAt = block.timestamp;
		lastModified = createdAt;
    }

	function nextState() public {
		// FeeDetails memory details = fees[state];
		// details.addr = msg.sender;
		// details.value = 10;
		state = state + 1;
		lastModified = block.timestamp;
		// fees_result.push(state - 1);
	}

	function retrieveStateDescription() private view returns (string memory)
	{
		if (state == 0)
			return " check-in";
		else if (state == 1)
			return " loading";
		else if (state == 2)
			return " unloading";
		else if (state == 3)
			return " ready to collect";
		else
			return "Collected";
	}

	function retrieveState() public view returns (string memory) {
		if (state == 0 || state == 1)
			return string.concat(origin, retrieveStateDescription());
		else if (state == 2 || state == 3)
			return string.concat(destination, retrieveStateDescription());
		return retrieveStateDescription();
	}

	// function retrieveFees() public view returns (FeeDetails[] memory) {
	// 	FeeDetails[] memory feesArray = new FeeDetails[](fees);

	// 	for (uint256 i = 0; i < fees.length; i++) {
	// 		feesArray[i] = fees[i];
	// 	}

	// 	return feesArray;
	// }
}