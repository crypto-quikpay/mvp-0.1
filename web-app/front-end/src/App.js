import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectWallet from './ConnectWallet';
import DisplayWalletInfo from './DisplayWalletInfo';
import SendTokens from './SendTokens';
import SwapTokens from './SwapTokens';
import TransactionStatus from './TransactionStatus';

export default function App() {
  const [ethersProvider, setEthersProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const [showSendTokens, setShowSendTokens] = useState(false);
  const [showSwapTokens, setShowSwapTokens] = useState(false);

  useEffect(() => {
    document.body.className = 'dark-mode';
  }, []);

  const toggleSendTokens = () => {
    setShowSendTokens(true);
    setShowSwapTokens(false);
  };

  const toggleSwapTokens = () => {
    setShowSendTokens(false);
    setShowSwapTokens(true);
  };

  return (
    <div className="container text-center mt-5">
      <div className="d-flex justify-content-between mb-3">
        <div></div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={true}
            readOnly
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Dark Mode
          </label>
        </div>
      </div>
      <div className="metadata">
        <h1>Crypto QuikPay</h1>
        <p>
          Crypto QuikPay is a design-first innovative way to unify payments through an address such that any user can pay through any wallet and any currency while another user can receive a different currency in a different wallet.
          All of this is abstracted from users, and done in a seamless yet elegant way.
        </p>
      </div>
      <p className="mb-4">Seamless Crypto Transactions at Your Fingertips</p>
      <ConnectWallet setEthersProvider={setEthersProvider} setAccount={setAccount} setWallet={setWallet} setTransactionStatus={setTransactionStatus} setTransactionReceipt={setTransactionReceipt} />
      <DisplayWalletInfo account={account} wallet={wallet} ethersProvider={ethersProvider} />
      {wallet && (
        <div className="d-flex justify-content-center mb-3">
          <button onClick={toggleSendTokens} className="btn btn-success me-2">
            Send Tokens
          </button>
          <button onClick={toggleSwapTokens} className="btn btn-warning">
            Swap Tokens
          </button>
        </div>
      )}
      {showSendTokens && <SendTokens ethersProvider={ethersProvider} setTransactionStatus={setTransactionStatus} setTransactionReceipt={setTransactionReceipt} />}
      {showSwapTokens && <SwapTokens ethersProvider={ethersProvider} setTransactionStatus={setTransactionStatus} setTransactionReceipt={setTransactionReceipt} />}
      <TransactionStatus status={transactionStatus} receipt={transactionReceipt} />
    </div>
  );
}
