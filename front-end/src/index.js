import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Onboard, {chains} from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets';

const INFURA_ID = 'f398c224e20846ec9295c637c7e489c9'; 

const injected = injectedModule();
const wallets = [injected];

const chainsList = [
  {
    id: '0xaa36a7',
    token: 'ETH',
    label: 'Ethereum Sepolia',
    rpcUrl: `https://sepolia.gateway.tenderly.co`
  }
];

const onboardInstance = Onboard({
  wallets,
  chains: chainsList,
  appMetadata: {
    name: 'Crypto QuikPay',
   // icon: '<svg><svg/>', // You can replace this with your app's icon SVG or remove this line
    description: 'Seamless Crypto Transactions at Your Fingertips'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App onboard={onboardInstance}/>
  </React.StrictMode>,
  document.getElementById('root')
);
