import { ethers } from 'ethers';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';

const MAINNET_URL = 'https://mainnet.infura.io/v3/ea32d7cf31f24efe95db13a5b7357cd8';
const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

export const fetchPrice = async (addressFrom, addressTo, humanValue) => {
  const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider
  );
  
  const amountIn = ethers.utils.parseUnits(humanValue, 18);
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    addressFrom,
    addressTo,
    3000, // Pool fee of 0.3%
    amountIn.toString(),
    0 // No slippage
  );
  
  const amount = ethers.utils.formatUnits(quotedAmountOut.toString(), 18);
  return amount;
};
