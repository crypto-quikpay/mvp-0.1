import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

export default function ConnectWallet({ setEthersProvider, setAccount, setWallet }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  useEffect(() => {
    if (wallet?.provider) {
      console.log('wallet object:', wallet); // Debugging line
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

  return (
    <div className="mb-4">
      {wallet ? (
        <button onClick={() => disconnect({ label: wallet.label })} className="btn btn-danger">
          Disconnect
        </button>
      ) : (
        <button disabled={connecting} onClick={() => connect()} className="btn btn-primary">
          Connect
        </button>
      )}
    </div>
  );
}
