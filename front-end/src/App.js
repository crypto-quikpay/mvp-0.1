import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App({onboard}) {
  const connectWallet = async() => {
    const wallets = await onboard.connectWallet();
    console.log(wallets);
  };

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="welcome-screen">
            <h1>Welcome to Crypto QuikPay</h1> 
            <br></br>
            <p><b>Crypto QuikPay</b> is a design-first innovative way to unify payments through an address such that any user can pay through any wallet and any currency while another user can receive a different currency in a different wallet.
            All of this is abstracted from users, and done in a seamless yet elegant way.</p>
            <button onClick={connectWallet} className="btn btn-primary">
              Connect to Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
