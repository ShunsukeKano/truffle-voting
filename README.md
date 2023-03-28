# Voting System on Blockchain

### Off-chain stream: A voting system using off-chain voting roll call

## Getting Started

Step 1: Run the command to install dependencies

```bash
npm install
```

Step 2:

```bash
cd /truffle
```

and run

```bash
truffle develop
```

Step 3: Setup Ganache local network and check truffle-config.js to match with your local environment.

Step 4: run

```bash
migrate --network development
```

Step 5:

```bash
cd /scripts/votingSystem.js
```

and change contractAddress to deployed contract address.

Step 6: Change newVoterAddress in votingSystem.js, if necessary

Step 7: run the command to see the outputs.

```bash
node /scripts/votingSystem.js
```

<br />
<br />


## Introduction

This voting system is a decentralized voting platform based on the Ethereum blockchain, which comes with the <a href="https://github.com/trufflesuite/truffle" target="_blank">Truffle framework</a> and tested on <a href="https://github.com/trufflesuite/ganache" target="_blank">Ganache</a> local network. It allows the creation of proposals and voting on them using ERC20 tokens for authentication.

## High-Level Design

The contract has the following components:

### 1. Proposals Array

The proposals array stores all created proposals. A new proposal is added to the array using the createProposal function.

### 2. Voters Mapping

The voters mapping maps an Ethereum address to a boolean value, which represents whether the address has already voted.

### 3. VoteSignatures Mapping

The voteSignatures mapping maps an Ethereum address to a uint256 signature. The signature is used for vote authentication.

### 4. ERC20 Token

The contract uses an ERC20 token for voter authentication. The token address is passed to the constructor during deployment.

## Implementation Details

### 1. Constructor

The constructor takes the address of the ERC20 token as an argument and initializes the token variable.

### 2. createProposal Function

This function is an external function that the contract owner can only call. It takes a string description as an argument and creates a new proposal with the given description and an initial vote count of 0.

### 3. vote Function

This function is an external function that allows eligible voters to cast their votes. It takes a proposalId and a signature as arguments. The function also checks that the voter hasn't already voted, that the proposal ID is valid, and that the provided signature matches the voter's stored signature. If all checks pass, the vote is counted, and the voter's status is updated.

### 4. addVoter Function

This function is an external function that the contract owner can only call. It takes an Ethereum address and a uint256 signature as arguments. The function also checks if the voter is already added, and if not, it adds the voter's signature to the voteSignatures mapping.

### 5. Gas Cost Optimizations

The contract minimizes gas costs by using efficient data structures (mappings) and avoiding unnecessary loops (no for loop) or complex computations. The contract uses OpenZeppelin's libraries, which have been audited and optimized for gas efficiency.

### 6. Security Considerations

The contract uses the Ownable pattern from OpenZeppelin to restrict access to sensitive functions, such as adding voters and creating proposals.

In addition, the contract leverages OpenZeppelin's audited contracts, which are widely used and have a strong security track record.

Furthermore, the contract relies on vote signatures for authentication. This approach prevents unauthorized voting but requires a secure off-chain signature generation and management system.

## Additional Notes

The contract allows for the addition of new proposals and voters. Please edit the value of proposalDescriptions and after the comment "Add more new voters" in votingSystem.js.
