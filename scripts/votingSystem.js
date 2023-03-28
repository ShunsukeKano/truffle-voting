// Imported web3
const Web3 = require('web3');

// Ganache network address: Replace this URL with your local RPC server URL
const web3 = new Web3('http://127.0.0.1:7545');

// Impoted ABI
const contractABI = require('../build/contracts/VotingSystem.json').abi;

// Contract address: Replace this address with deployed contact address
const contractAddress = '0x1D62258CF0bb9A6946AE6732863c908d13D8f644'; 

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Proposal descriptions
const proposalDescriptions = ['Proposal 1', 'Proposal 2', 'Proposal 3'];

// Function to create a new proposal with a given description
async function createProposal(description) {
  const accounts = await web3.eth.getAccounts();
  const result = await contractInstance.methods.createProposal(description).send({ from: accounts[0] });
  console.log(`Proposal created with ID ${result.events.ProposalCreated.returnValues.proposalId}`);
}

// Function to vote on a proposal with a given ID and signature
async function vote(proposalId, signature) {
  const accounts = await web3.eth.getAccounts();
  const result = await contractInstance.methods.vote(proposalId, signature).send({ from: accounts[0] });
  console.log(`Vote cast for proposal ${proposalId}, Transaction hash: ${result.transactionHash}`);
}

// Function to add a voter with a given address and signature
async function addVoter(address, signature) {
  const accounts = await web3.eth.getAccounts();
  await contractInstance.methods.addVoter(address, signature).send({ from: accounts[0] });
  console.log(`Voter ${address} added with signature ${signature}`);
}

// Call all function to demonstrate the usage of createProposal, vote, and addVoter functions
async function main() {
  // Create all proposals from proposalDescriptions
  for (const description of proposalDescriptions) {
    await createProposal(description);
  }

  // Add the default account (accounts[0]) as a voter
  const accounts = await web3.eth.getAccounts();
  const defaultAccountSignature = 12345;
  await addVoter(accounts[0], defaultAccountSignature);

  // Vote for proposal 0 using the same signature as the new voter
  const proposalId = 0;
  await vote(proposalId, defaultAccountSignature);

  // Add a new voter
  const newVoterAddress = '0x2470cA2643755C5a52Bdf0d727B8BD0C7944Cc2b';
  const newVoterSignature = 67890;
  await addVoter(newVoterAddress, newVoterSignature);

   // Add more new voters
  //  const newVoterAddressTwo = '0x14774B4d71a3A9143A628Ec4c8898c475a2aBFEe';
  //  const newVoterSignatureTwo = 54321;
  //  await addVoter(newVoterAddressTwo, newVoterSignatureTwo);
}

main().catch(console.error);
