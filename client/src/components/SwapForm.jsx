// components/SwapForm.jsx
import React, { useState, useEffect } from 'react';
import TokenModal from './TokenModal';
import { fetchPrice } from '../utils/fetch';

const tokens = [
  { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', symbol: 'WETH', name: 'Ethereum' },
  { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', name: 'Dai' },
  { address: '0xA0b86991c6218B36c1d19D4a2e9Eb0cE3606EB48', symbol: 'USDC', name: 'USD Coin' },
  // Add more tokens as needed
];

const SwapForm = () => {
  const [tokenIn, setTokenIn] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [showTokenInModal, setShowTokenInModal] = useState(false);
  const [showTokenOutModal, setShowTokenOutModal] = useState(false);

  useEffect(() => {
    const updatePrice = async () => {
      if (tokenIn && tokenOut && amountIn && amountIn > 0) {
        try {
          const price = await fetchPrice(tokenIn.address, tokenOut.address, amountIn);
          setAmountOut(price);
        } catch (error) {
          console.error("Error fetching the price:", error);
          setAmountOut(''); // Clear amountOut on error
        }
      } else {
        setAmountOut(''); // Clear amountOut if conditions are not met
      }
    };

    updatePrice(); // Call the function to update the price
  }, [amountIn, tokenIn, tokenOut]); // Re-run when any of these change

  const handleSwap = () => {
    if (tokenIn && tokenOut && amountIn && amountOut) {
      alert(`You will receive approximately ${amountOut} ${tokenOut.symbol}`);
    } else {
      alert("Please select both tokens and enter the amount to swap.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="bg-gray-900 text-white p-3 rounded-3xl shadow-lg w-full max-w-lg">
        
        {/* Sell Token Section */}
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
              />
              <button
                onClick={() => setShowTokenInModal(true)}
                className="bg-gray-900 border border-gray-800 rounded-full p-3 ml-2 flex items-center"
              >
                {tokenIn ? tokenIn.symbol : "Select Token"}
              </button>
            </div>
          </div>
        </div>

        {/* Buy Token Section */}
        <div className="bg-gray-800 text-white p-6 rounded-3xl mb-2 shadow-lg w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <label className="text-lg text-gray-500 font-bold">Buy</label>
            <div className="flex items-center">
              <input
                type="number"
                value={amountOut}
                readOnly
                placeholder="0"
                className="bg-gray-800 border border-gray-800 text-gray-300 rounded p-3 mb-2 flex-grow appearance-none"
              />
              <button
                onClick={() => setShowTokenOutModal(true)}
                className="bg-gray-900 border border-gray-800 rounded-full p-3 ml-2 flex items-center"
              >
                {tokenOut ? tokenOut.symbol : "Select Token"}
              </button>
            </div>
          </div>
        </div>

        {/* Token Modals */}
        {showTokenInModal && (
          <TokenModal
            tokens={tokens}
            onSelectToken={(token) => {
              setTokenIn(token);
              setShowTokenInModal(false);
            }}
            onClose={() => setShowTokenInModal(false)}
          />
        )}
        {showTokenOutModal && (
          <TokenModal
            tokens={tokens}
            onSelectToken={(token) => {
              setTokenOut(token);
              setShowTokenOutModal(false);
            }}
            onClose={() => setShowTokenOutModal(false)}
          />
        )}

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
