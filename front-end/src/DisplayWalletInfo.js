import React from 'react';

export default function DisplayWalletInfo({ account, wallet }) {
  if (!wallet || !account) {
    return null;
  }

  return (
    <div>
      {account.ens?.avatar ? <img src={account.ens?.avatar} alt="ENS Avatar" className="ens-avatar" /> : null}
      <div>{account.ens?.name ? account.ens.name : account.address}</div>
      <div>Connected to {wallet.label}</div>
    </div>
  );
}
