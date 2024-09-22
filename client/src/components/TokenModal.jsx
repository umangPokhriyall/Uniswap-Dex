// components/TokenModal.jsx
import React from 'react';

const TokenModal = ({ tokens, onSelectToken, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Select a Token</h2>
        <ul>
          {tokens.map((token) => (
            <li key={token.address} className="py-2">
              <button
                onClick={() => {
                  onSelectToken(token);
                  onClose();
                }}
                className="w-full text-left bg-gray-800 hover:bg-gray-700 p-2 rounded"
              >
                {token.symbol} - {token.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TokenModal;
