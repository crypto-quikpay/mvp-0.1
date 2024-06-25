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
        balance: null,
        ens: { name, avatar }
      };
      setAccount(account);
      setWallet(wallet);

      const networkNames = {
        '0xaa36a7': 'Sepolia ETH',
      };

      const fetchBalances = async () => {
        const provider = new ethers.BrowserProvider(wallet.provider, 'any');
        const balance = await provider.getBalance(account.address);
        const chainId = wallet.chains?.[0]?.id || wallet.chainId || 'Unknown Network';
        const networkName = networkNames[chainId.toString()] || 'Unknown Network';
        setAccount((prevAccount) => ({
          ...prevAccount,
          balance: ethers.formatEther(balance),
          network: networkName,
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
    const signer = await ethersProvider.getSigner();

    try {
      const balance = await ethersProvider.getBalance(await signer.getAddress());
      const value = ethers.parseEther(amount);
      if (balance < value) {  // Comparison between bigints
        console.error('Insufficient balance');
        return;
      }

      const txResponse = await signer.sendTransaction({
        to: toAddress,
        value: value
      });

      const receipt = await txResponse.wait();
      console.log('Transaction Receipt:', receipt);
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
