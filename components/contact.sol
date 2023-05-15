// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistration {
    
    struct User {
        string name;
        string email;
        string phoneNumber;
        bool isAdmin;
        bool isApproved;
        bool isLoggedIn;
        bool hasDocument;
        bool isDocumentVerified;
        string documentHash;
    }
    
    mapping (address => User) public users;
    
    address[] public userAddresses;
    address[] public approvedUserAddresses;
    
    address public adminAddress;
    
    constructor() {
        adminAddress = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Only admin can perform this action");
        _;
    }
    
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isApproved, "You need to be an approved user to perform this action");
        _;
    }
    
    modifier onlyLoggedInUser() {
        require(users[msg.sender].isLoggedIn, "You need to be logged in to perform this action");
        _;
    }
    
    function register(string memory name, string memory email, string memory phoneNumber) public {
        require(bytes(users[msg.sender].name).length == 0, "User is already registered");
        users[msg.sender] = User(name, email, phoneNumber, false, false, false, false, false,"");
        userAddresses.push(msg.sender);
    }
    
    function approveUser(address userAddress) public onlyAdmin {
        require(!users[userAddress].isApproved, "User is already approved");
        users[userAddress].isApproved = true;
        users[userAddress].isAdmin = false;
        approvedUserAddresses.push(userAddress);
    }
    
    function login() public onlyRegisteredUser {
        require(!users[msg.sender].isLoggedIn, "User is already logged in");
        users[msg.sender].isLoggedIn = true;
    }
    
    function logout() public onlyLoggedInUser {
        users[msg.sender].isLoggedIn = false;
    }
    
    // function uploadDocument() public onlyLoggedInUser {
    //     require(!users[msg.sender].hasDocument, "User has already uploaded a document");
    //     users[msg.sender].hasDocument = true;
    //     users[msg.sender].isDocumentVerified = false;
    // }

    function uploadDocument(string memory documentHash) public onlyLoggedInUser {
    require(!users[msg.sender].hasDocument, "User has already uploaded a document");
    users[msg.sender].hasDocument = true;
    users[msg.sender].isDocumentVerified = false;
    users[msg.sender].documentHash = documentHash;
}
    
    function approveDocument(address userAddress) public onlyAdmin {
        require(users[userAddress].hasDocument, "User has not uploaded a document");
        users[userAddress].isDocumentVerified = true;
    }
    
    function getUser(address userAddress) public view  returns (string memory, string memory, string memory, bool, bool, bool, bool, bool) {
        User memory user = users[userAddress];
        return (user.name, user.email, user.phoneNumber, user.isAdmin, user.isApproved, user.isLoggedIn, user.hasDocument, user.isDocumentVerified);
    }
    
    function getUserCount() public view onlyAdmin returns (uint) {
        return userAddresses.length;
    }
    
    function getApprovedUserCount() public view onlyAdmin returns (uint) {
        return approvedUserAddresses.length;
    }
    
    function getUnapprovedUsers() public view onlyAdmin returns (address[] memory) {
        address[] memory unapprovedUsers = new address[](userAddresses.length - approvedUserAddresses.length);
        uint index = 0;
        for (uint i = 0; i < userAddresses.length; i++) {
            address userAddress = userAddresses[i];
            if (!users[userAddress].isApproved) {
                unapprovedUsers[index] = userAddress;
                index++;
            }
        }
        return unapprovedUsers;
    }
    
    function getAllUsers() public view  returns (address[] memory) {
        return userAddresses;
    }

    function getDocumentVerificationStatus(address userAddress) public view  returns (bool, string memory) {
    return (users[userAddress].isDocumentVerified, users[userAddress].documentHash);
}
}
