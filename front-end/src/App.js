import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ConnectWallet from './ConnectWallet';
import DisplayWalletInfo from './DisplayWalletInfo';

export default function App() {
  const [ethersProvider, setEthersProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="welcome-screen">
            <h1>Welcome to Crypto QuikPay</h1>
            <p>Seamless Crypto Transactions at Your Fingertips</p>
            <ConnectWallet setEthersProvider={setEthersProvider} setAccount={setAccount} setWallet={setWallet} />
            <DisplayWalletInfo account={account} wallet={wallet} />
          </div>
        </div>
      </div>
    </div>
  );
}
