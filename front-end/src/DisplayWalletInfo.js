import React from 'react';

export default function DisplayWalletInfo({ account, wallet }) {
  if (!wallet || !account) {
    return null;
  }

  return (
    <div className="card text-center mt-4">
      <div className="card-body">
        {account.ens?.avatar ? <img src={account.ens?.avatar} alt="ENS Avatar" className="ens-avatar" /> : null}
        <h5 className="card-title">{account.ens?.name ? account.ens.name : account.address}</h5>
        <p className="card-text">Connected to {wallet.label}</p>
      </div>
    </div>
  );
}
