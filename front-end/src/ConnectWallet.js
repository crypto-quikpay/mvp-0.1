import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

export default function ConnectWallet({ setEthersProvider, setAccount, setWallet }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      const account = {
        address: wallet.accounts[0].address,
        balance: null, // Initializing balance as null
        ens: { name, avatar }
      };
      setAccount(account);
      setWallet(wallet);

      // Network name mapping
      const networkNames = {
        '0xaa36a7': 'Sepolia ETH', // Ensure the key is a string
      };

      // Fetch ETH balance for the connected account
      const fetchBalances = async () => {
        const provider = new ethers.BrowserProvider(wallet.provider, 'any');
        const balance = await provider.getBalance(account.address);
        const chainId = wallet.chains?.[0]?.id || wallet.chainId || 'Unknown Network';
        console.log('chainId:', chainId); // Debugging line
        const networkName = networkNames[chainId.toString()] || 'Unknown Network';
        setAccount((prevAccount) => ({
          ...prevAccount,
          balance: ethers.formatEther(balance),
          network: networkName, // Add network name to account object
        }));
      };

      fetchBalances();
    }
  }, [wallet, setAccount, setWallet]);

  useEffect(() => {
    if (wallet?.provider) {
      setEthersProvider(new ethers.BrowserProvider(wallet.provider, 'any'));
    }
  }, [wallet, setEthersProvider]);

  const handleSendTransaction = async () => {
    if (!wallet?.provider || !toAddress || !amount) return;

    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = ethersProvider.getSigner();

    try {
      const txResponse = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount)
      });
      console.log('Transaction Response:', txResponse);
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div className="mb-4">
      {wallet ? (
        <>
          <div className="mb-3">
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
            <button onClick={handleSendTransaction} className="btn btn-success mb-2">
              Send Transaction
            </button>
          </div>
          <button onClick={() => disconnect({ label: wallet.label })} className="btn btn-danger">
            Disconnect
          </button>
        </>
      ) : (
        <button disabled={connecting} onClick={() => connect()} className="btn btn-primary">
          Connect
        </button>
      )}
    </div>
  );
}
