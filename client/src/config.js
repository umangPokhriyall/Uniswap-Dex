// config.js
import { ethers } from 'ethers';

const RPC_URL = 'YOUR_RPC_URL'; // Replace with your actual RPC URL
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

export { RPC_URL, provider };
