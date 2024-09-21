import React, { useState } from 'react';
// import { useUniswap } from '../hooks/useUniswap';
// import { AuthContext } from '../contexts/AuthContext';
import TokenList from './TokenList';

const tokens = [
  { address: '0x...', symbol: 'ETH' },
  { address: '0x...', symbol: 'DAI' },
  { address: '0x...', symbol: 'USDC' },
  // Add more tokens as needed
];

const SwapForm = () => {
  // const { account } = useContext(AuthContext);
  // const { swapState, performSwap } = useUniswap();
  const [tokenIn, setTokenIn] = useState(tokens[0]); // Default to first token
  const [amountIn, setAmountIn] = useState('');
  const [showTokenList, setShowTokenList] = useState(false);

  const handleSwap = () => {
    if (account) {
      performSwap(tokenIn.address, amountIn, account);
    }
    alert(`Swapping ${amountIn} of ${tokenIn.symbol}`);
  };

  const toggleTokenList = () => {
    setShowTokenList((prev) => !prev);
  };

  const selectToken = (token) => {
    setTokenIn(token);
    setShowTokenList(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="bg-gray-900 text-white p-3 rounded-3xl shadow-lg w-full max-w-lg">
        <div className="bg-gray-800 text-white p-6 rounded-3xl mb-2 shadow-lg w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <label className="text-lg text-gray-500 font-bold">Sell</label>
            <div className="flex items-center">
              <input
                type="number"
                placeholder="0"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                className="bg-gray-800 border border-gray-800 text-gray-300 rounded p-3 mb-2 flex-grow appearance-none"
                style={{
                  '-moz-appearance': 'none',
                  '-webkit-appearance': 'none',
                }} // Hides default arrows
              />
              <button
                onClick={toggleTokenList}
                className="bg-gray-900 border border-gray-800 rounded-full p-3 ml-2 flex items-center"
              >
                {tokenIn.symbol}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-1"
                >
                  <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {showTokenList && (
              <TokenList
                tokens={tokens}
                selectedToken={tokenIn}
                onSelectToken={selectToken}
              />
            )}
          </div>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-3xl mb-2 shadow-lg w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <label className="text-lg text-gray-500 font-bold">Buy</label>
            <div className="flex items-center">
              <input
                type="number"
                placeholder="0"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                className="bg-gray-800 border border-gray-800 text-gray-300 rounded p-3 mb-2 flex-grow appearance-none"
                style={{
                  '-moz-appearance': 'none',
                  '-webkit-appearance': 'none',
                }} // Hides default arrows
              />
              <button
                onClick={toggleTokenList}
                className="bg-gray-900 border border-gray-800 rounded-full p-3 ml-2 flex items-center"
              >
                {tokenIn.symbol}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-1"
                >
                  <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {showTokenList && (
              <TokenList
                tokens={tokens}
                selectedToken={tokenIn}
                onSelectToken={selectToken}
              />
            )}
          </div>
        </div>
          <button
            onClick={handleSwap}
            className="bg-pink-400 hover:bg-pink-600 text-white font-semibold w-full max-w-lg py-2 px-4 rounded-2xl"
          >
            Swap
          </button>
      </div>
    </div>
  );
};

export default SwapForm;
