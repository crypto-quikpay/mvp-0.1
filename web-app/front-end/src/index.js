import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';

const INFURA_ID = 'YOUR_INFURA_ID'; // Replace with your actual Infura Project ID

const injected = injectedModule();
const wallets = [injected];

const chains = [
  {
    id: '0xaa36a7',
    token: 'ETH',
    label: 'Ethereum Sepolia',
    rpcUrl: `https://sepolia.gateway.tenderly.co`
  }
];

const appMetadata = {
  name: 'Crypto QuikPay',
  description: 'Seamless Crypto Transactions at Your Fingertips',
};

init({
  wallets,
  chains,
  appMetadata
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
