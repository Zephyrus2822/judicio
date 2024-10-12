const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Connecting to local blockchain (Ganache)
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Get contract ABI and deployed address
const contractPath = path.resolve(__dirname, '../build/contracts', 'BailContract.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

const contractABI = contractJSON.abi;
const contractAddress = 'PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE'; // Replace with actual deployed address

const bailContract = new web3.eth.Contract(contractABI, contractAddress);

// Example: Interacting with the contract
async function getBailDecision() {
  try {
    const decision = await bailContract.methods.getDecision().call();
    console.log("Bail Decision:", decision);
    return decision;
  } catch (err) {
    console.error("Error getting bail decision:", err);
  }
}

module.exports = { getBailDecision };
