const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const fetch = require('node-fetch');

const API_KEY = process.env.ONEINCH_API_KEY;
const chainId = 11155111; // Sepolia chain ID

router.post('/swap', async (req, res) => {
  const { fromToken, toToken, amount, userAddress } = req.body;

  try {
    const swapParams = {
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount: amount,
      fromAddress: userAddress,
      slippage: 1,
      disableEstimate: false,
      allowPartialFill: false,
    };

    const url = `https://api.1inch.dev/swap/v6.0/${chainId}/swap`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      qs: swapParams,
    });

    const data = await response.json();
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.json(data.tx);
  } catch (error) {
    console.error('Swap API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
