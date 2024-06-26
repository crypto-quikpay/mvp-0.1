import React from 'react';
import { ethers } from 'ethers';

export default function TransactionStatus({ status, receipt }) {
  return (
    <div className="mt-4">
      {status && (
        <div className="alert alert-info">
          {status}
          {receipt && (
            <div className="mt-3">
              <p><strong>Sender:</strong> {receipt.from}</p>
              <p><strong>Receiver:</strong> {receipt.to}</p>
              <p><strong>Amount:</strong> {receipt.value ? ethers.formatEther(receipt.value) : 'N/A'} ETH</p>
              <p><strong>Transaction Hash:</strong> <a href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`} target="_blank" rel="noopener noreferrer">{receipt.transactionHash}</a></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
