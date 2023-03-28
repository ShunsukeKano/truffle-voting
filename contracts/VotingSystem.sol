// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is Ownable {
    struct Proposal {
        string description;
        uint256 voteCount;
    }
    
    // Array of Proposal structs to store the proposals
    Proposal[] public proposals;

    // Mapping to track whether an address has already voted
    mapping(address => bool) public voters;
    // Mapping to store vote signatures for each address
    mapping(address => uint256) public voteSignatures;

    IERC20 public token;

    // Events
    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(address indexed voter, uint256 indexed proposalId);

     // Initializes the token instance when the contract is deployed
    constructor(IERC20 _token) {
        token = _token;
    }
  
    // This function allows the contract owner to create a new proposal
    function createProposal(string calldata description) external onlyOwner {
        proposals.push(Proposal(description, 0));
        uint256 proposalId = proposals.length - 1;
        emit ProposalCreated(proposalId, description);
    }

    // This function allows eligible voters to cast their vote for a specific proposal
    function vote(uint256 proposalId, uint256 signature) external {
        // Authentication
        require(!voters[msg.sender], "Contract error: Already voted.");
        require(proposalId < proposals.length, "Contract error: Invalid proposal ID.");
        require(signature == voteSignatures[msg.sender], "Contract error: Invalid vote signature.");

        proposals[proposalId].voteCount++;
        voters[msg.sender] = true;

        emit Voted(msg.sender, proposalId);
    }

    // This function allows the contract owner to add a new voter and their respective vote signature
    function addVoter(address voter, uint256 signature) external onlyOwner {
        // Authentication
        require(!voters[voter], "Contract error: Already added.");
        voteSignatures[voter] = signature;
    }
}
