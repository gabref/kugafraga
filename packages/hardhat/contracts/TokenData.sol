//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

struct TokenData {
	address		tokenAddress;
	address		owner;
	string[]	route;
	string		symbol;
	string		state;
	string		location;
	uint		lastModified;
	uint		createdAt;
}