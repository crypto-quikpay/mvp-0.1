import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectWallet from './ConnectWallet';
import DisplayWalletInfo from './DisplayWalletInfo';

export default function App() {
  const [ethersProvider, setEthersProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Turn on dark mode by default

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="container text-center mt-5">
      <div className="d-flex justify-content-between mb-3">
        <div></div> {/* Empty div to push the toggle to the right */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={toggleDarkMode}
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
      <ConnectWallet setEthersProvider={setEthersProvider} setAccount={setAccount} setWallet={setWallet} />
      <DisplayWalletInfo account={account} wallet={wallet} />
    </div>
  );
}
