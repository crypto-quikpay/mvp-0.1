import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

export default function ConnectWallet({ setEthersProvider, setAccount, setWallet }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar }
      });
      setWallet(wallet);  // Setting wallet for DisplayWalletInfo component
    }
  }, [wallet, setAccount, setWallet]);

  useEffect(() => {
    if (wallet?.provider) {
      setEthersProvider(new ethers.BrowserProvider(wallet.provider, 'any'));
    }
  }, [wallet, setEthersProvider]);

  return (
    <div>
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
