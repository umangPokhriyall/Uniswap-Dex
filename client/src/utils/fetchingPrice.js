import { ethers , JsonRpcProvider} from 'ethers';

import { Token } from '@uniswap/sdk-core'
// import { CurrentConfig } from '../config';
import { computePoolAddress } from '@uniswap/v3-sdk';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
// import { getProvider } from '../libs/providers';
import { toReadableAmount, fromReadableAmount } from '../libs/conversion.js';
import { FeeAmount } from '@uniswap/v3-sdk'; // Make sure to import FeeAmount

// Use the constants defined in your constants file if they exist
const POOL_FACTORY_CONTRACT_ADDRESS = 
  '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const QUOTER_CONTRACT_ADDRESS = 
  '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

// Token definitions
const WETH_TOKEN = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const USDC_TOKEN = new Token(
  1,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
);

// Provider for Ethereum mainnet
const MAINNET_URL = 'https://mainnet.infura.io/v3/ea32d7cf31f24efe95db13a5b7357cd8';
const provider = new JsonRpcProvider(MAINNET_URL);

// Quote function to fetch the amount out for a given input
export async function quote() {
    try {
      // Initialize Quoter contract
      const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        provider
      );
  
      // Fetch pool constants (token addresses, fee)
      const poolConstants = await getPoolConstants();
  
      // Fetch the quoted amount out
      const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        fromReadableAmount(1000, USDC_TOKEN.decimals).toString(), // Amount in for USDC with correct decimals
        0 // Slippage tolerance or minimum amount out
      );
  
      // Return formatted amount with WETH decimals
      return toReadableAmount(quotedAmountOut, WETH_TOKEN.decimals);
    } catch (error) {
      console.error("Error fetching the quote:", error);
      throw error; // Rethrow to handle elsewhere if needed
    }
  }
  
  // Function to get the constants of the pool
  async function getPoolConstants() {
    try {
      // Compute pool address for USDC/WETH with Medium fee tier (0.3%)
      const currentPoolAddress = computePoolAddress({
        factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: USDC_TOKEN,
        tokenB: WETH_TOKEN,
        fee: FeeAmount.MEDIUM, // Fee amount for Uniswap (0.3%)
      });
  
      // Initialize the pool contract
      const poolContract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolABI.abi,
        provider
      );
  
      // Fetch token0, token1, and fee from the pool
      const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
      ]);
  
      return { token0, token1, fee };
    } catch (error) {
      console.error("Error fetching pool constants:", error);
      throw error;
    }
  }