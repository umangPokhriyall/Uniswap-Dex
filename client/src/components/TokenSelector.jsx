import React, { useEffect, useState } from 'react';
import { getTokenList } from '../utils/getTokenList';

const TokenSelector = ({ onSelectToken, selectedToken }) => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            const tokenList = await getTokenList();
            setTokens(tokenList); // Storing tokens in state
        };
        fetchTokens();
    }, []);

    const handleTokenSelect = (e) => {
        const tokenAddress = e.target.value;
        onSelectToken(tokenAddress); // Callback to parent component
    };

    return (
        <div>
            <select onChange={handleTokenSelect} value={selectedToken}>
                <option value="">Select a token</option>
                {tokens.map((token) => (
                    <option key={token.address} value={token.address}>
                        {token.symbol} - {token.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TokenSelector;
