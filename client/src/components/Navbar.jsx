// Navbar.jsx
import React from 'react';

const Navbar = () => {
  const handleConnectWallet = () => {
    // Logic for connecting to a wallet (e.g., MetaMask)
    console.log("Connect Wallet");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
      </div>
      <ul className="flex space-x-6">
        <li><a href="/" className="hover:text-pink-500">Home</a></li>
        <div className="flex items-center bg-white rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-black placeholder-gray-400 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 ml-2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <li><a href="/liquidity" className="hover:text-pink-500">Liquidity</a></li>
        <li><a href="/farm" className="hover:text-pink-500">Farm</a></li>
      </ul>
      <button 
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
    