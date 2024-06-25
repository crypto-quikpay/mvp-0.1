import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function SendTokens({ ethersProvider, setTransactionStatus, setTransactionReceipt }) {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendTransaction = async () => {
    if (!ethersProvider || !toAddress || !amount) return;

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

      const txResponse = await signer.sendTransaction({
        to: toAddress,
        value: value
      });

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
    <div className="mt-4">
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={handleSendTransaction} className="btn btn-success">
        Send Transaction
      </button>
    </div>
  );
}
