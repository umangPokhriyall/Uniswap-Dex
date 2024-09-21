// utils/getTokenList.js
export const getTokenList = async () => {
    const url = 'https://tokens.coingecko.com/uniswap/all.json'; // Example token list from CoinGecko
    const response = await fetch(url);
    const tokenList = await response.json();
    return tokenList.tokens; // List of token objects
  };
  