import React from 'react';

const TokenList = ({ tokens, selectedToken, onSelectToken }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4">
      <h4 className="text-white mb-2">Select Token</h4>
      <ul className="space-y-2">
        {tokens.map((token) => (
          <li
            key={token.address}
            className={`p-2 cursor-pointer rounded-lg hover:bg-gray-600 ${selectedToken === token.address ? 'bg-gray-500' : ''}`}
            onClick={() => onSelectToken(token.address)}
          >
            {token.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList;
