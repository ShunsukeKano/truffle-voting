# Voting System on Blockchain README
## (A voting system using off-chain voting roll call)

1. cd /truffle and run "truffle develop"
2. Setup Ganache local net work and confirm truffle-config.js
3. run "migrate --network development"
4. cd /scripts/votingSystem.js and change contractAddress to deployed contract address
4. Change newVoterAddress in votingSystem.js, if necessary
5. run node /scripts/votingSystem.js to see the outcome.

This voting system is a decentralized voting platform based on the Ethereum blockchain. It allows the creation of proposals and voting on them using ERC20 tokens for authentication. The smart contract is written in Solidity and uses OpenZeppelin's contracts as a foundation.

## High-Level Design
The VotingSystem contract consists of the following components:

1. Proposal struct
2. Proposals array
3. Voters mapping
4. VoteSignatures mapping
5. ERC20 token
6. Constructor
7. createProposal function
8. vote function
9. addVoter function
10. Proposal Struct
11. Each proposal consists of a description and a vote count. The description is a string, while the vote count is a uint256.

### Proposals Array
The proposals array stores all created proposals. A new proposal is added to the array using the createProposal function.

### Voters Mapping
The voters mapping maps an Ethereum address to a boolean value, which represents whether the address has already voted.

### VoteSignatures Mapping
The voteSignatures mapping maps an Ethereum address to a uint256 signature. The signature is used for vote authentication.

### ERC20 Token
The contract uses an ERC20 token for voter authentication. The token address is passed to the constructor during deployment.

## Implementation Details
###  Constructor
The constructor takes the address of the ERC20 token as an argument and initializes the token variable.

### createProposal Function
The createProposal function is an external function that can only be called by the contract owner. It takes a string description as an argument and creates a new proposal with the given description and an initial vote count of 0.

### vote Function
The vote function is an external function that allows eligible voters to cast their vote. It takes a proposalId and a signature as arguments. The function checks that the voter hasn't already voted, that the proposal ID is valid, and that the provided signature matches the voter's stored signature. If all checks pass, the vote is counted, and the voter's status is updated.

### addVoter Function
The addVoter function is an external function that can only be called by the contract owner. It takes an Ethereum address and a uint256 signature as arguments. The function checks if the voter is already added, and if not, it adds the voter's signature to the voteSignatures mapping.

### Gas Cost Optimizations
The contract minimizes gas costs by using efficient data structures (mappings) and avoiding unnecessary loops or complex computations. The contract uses OpenZeppelin's libraries, which have been audited and optimized for gas efficiency.

### Security Considerations
The contract uses the Ownable pattern from OpenZeppelin to restrict access to sensitive functions, such as adding voters and creating proposals.

The contract uses SafeMath for arithmetic operations to avoid overflows and underflows.

The contract leverages OpenZeppelin's audited contracts, which are widely used and have a strong security track record.

The contract relies on vote signatures for authentication. This approach prevents unauthorized voting but requires a secure off-chain signature generation and management system.

## Additional Notes
1. The VotingSystem contract allows for the addition of new proposals and voters, but it does not provide functionality for removing or modifying them.
2. The contract does not implement any time limits or deadlines for proposals or voting. This functionality can be added depending on the desired use case.
3. The contract does not support weighted voting based on token holdings. This feature could be added by modifying the vote function to consider the voter's token balance.
4. The contract does not include any mechanisms for dispute resolution or handling contentious proposals. The implementation of such features would depend on the specific requirements of the voting system.
