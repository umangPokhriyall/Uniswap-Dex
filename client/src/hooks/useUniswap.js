// hooks/useUniswap.js
import { useState, useEffect } from 'react';
import { AlphaRouter, ChainId } from '@uniswap/smart-order-router';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { provider } from '../config'; // Import the provider

const router = new AlphaRouter({ chainId: ChainId.MAINNET, provider });

const useUniswap = (tokenIn, tokenOut, amountIn, account) => {
  const [estimatedOutput, setEstimatedOutput] = useState('');

  useEffect(() => {
    const getRoute = async () => {
      if (!amountIn) {
        setEstimatedOutput('');
        return;
      }

      try {
        const rawTokenAmountIn = ethers.utils.parseUnits(amountIn, tokenIn.decimals);
        const route = await router.route(
          CurrencyAmount.fromRawAmount(
            new Token(ChainId.MAINNET, tokenIn.address, tokenIn.decimals),
            rawTokenAmountIn
          ),
          new Token(ChainId.MAINNET, tokenOut.address, tokenOut.decimals),
          TradeType.EXACT_INPUT,
          {
            recipient: account,
            slippageTolerance: new Percent(50, 10_000), // 0.5% slippage
            deadline: Math.floor(Date.now() / 1000 + 1800),
          }
        );
        
        if (route && route.quote) {
          setEstimatedOutput(route.quote.toSignificant(6));
        } else {
          setEstimatedOutput('');
        }
      } catch (error) {
        console.error("Error fetching route: ", error);
        setEstimatedOutput('');
      }
    };

    getRoute();
  }, [amountIn, tokenIn, tokenOut, account]);

  const performSwap = async () => {
    // Implement the swap logic here
  };

  return { estimatedOutput, performSwap };
};

export default useUniswap;
