// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;
contract UserContract {
	uint public userCount = 0;
	struct UserStruct {
		string name;
		string verificationCode;
		uint age;
		string addr;
		address userAddress;
		bool isverified;
		bool isLandInspector;
	}
	UserStruct[] users;
	constructor() public {
		createUser("Zyno", "test", 20, "ENSIAS");
	}

 	function createUser(string memory name, string memory verificationCode, uint age, string memory addr) public {
 		userCount++;
		users.push(UserStruct(name, verificationCode, age, addr, msg.sender, false, false));
	}

	function verifyUser(uint _id) public {
		users[_id].isverified = true;
	}

	function setLandInspector(uint _id) public {
		users[_id].isLandInspector = true;
	}
	function getAllUsers() public view returns (UserStruct[] memory) {
		return users;
	}

	function getUser(uint _id) public view returns (UserStruct memory) {
		return users[_id];
	}

	function modifyUser(uint _id, string memory name, string memory verificationCode, uint age, string memory addr) public {
		users[_id].name = name ;
		users[_id].verificationCode = verificationCode ;
		users[_id].age = age ;
		users[_id].addr = addr ;
	}


}