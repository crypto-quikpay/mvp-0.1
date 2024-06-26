import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function SwapTokens({ ethersProvider, setTransactionStatus, setTransactionReceipt }) {
  const [amount, setAmount] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [swapToken, setSwapToken] = useState('0xBASE_TOKEN_ADDRESS'); // Replace with actual Base token address

  useEffect(() => {
    const fetchAddress = async () => {
      if (ethersProvider) {
        const signer = await ethersProvider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      }
    };

    fetchAddress();
  }, [ethersProvider]);

  const handleSwapTransaction = async () => {
    if (!ethersProvider || !amount || !swapToken) return;

    const signer = await ethersProvider.getSigner();

    try {
      const balance = await ethersProvider.getBalance(await signer.getAddress());
      const value = ethers.parseEther(amount);
      if (balance < value) {
        console.error('Insufficient balance');
        setTransactionStatus('Insufficient balance');
        return;
      }

      setTransactionStatus('Transaction in progress...');

      // Call the swap function
      const swapTransaction = await fetch('http://localhost:3001/api/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromToken: 'ETH', // assuming swap from ETH
          toToken: swapToken,
          amount: value.toString(),
          userAddress: userAddress
        }),
      }).then(res => res.json());

      if (swapTransaction.error) {
        setTransactionStatus('Transaction failed: ' + swapTransaction.error);
        return;
      }

      const txResponse = await signer.sendTransaction(swapTransaction);
      setTransactionStatus('Waiting for confirmation...');

      const receipt = await txResponse.wait();
      setTransactionReceipt({
        ...receipt,
        value: value // Set the value in the receipt
      });

      setTransactionStatus('Transaction completed');
    } catch (error) {
      console.error('Transaction Error:', error);
      setTransactionStatus('Transaction failed');
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <select
          value={swapToken}
          onChange={(e) => setSwapToken(e.target.value)}
          className="form-control mb-2"
        >
          <option value="0xBASE_TOKEN_ADDRESS">Base Token</option>
          {/* Add other token options as needed */}
        </select>
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleSwapTransaction} className="btn btn-primary mb-2">
          Swap Tokens
        </button>
      </div>
    </div>
  );
}
