const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const { ethers } = require('ethers');

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

const API_KEY = process.env.ONEINCH_API_KEY;
const chainId = 11155111; // Sepolia chain ID

// Helper function to construct API request URL
const apiRequestUrl = (methodName, queryParams) => {
  const baseUrl = `https://api.1inch.dev/swap/v6.0/${chainId}`;
  return baseUrl + methodName + '?' + new URLSearchParams(queryParams).toString();
};

app.post('/api/swap', async (req, res) => {
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

    const url = apiRequestUrl('/swap', swapParams);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
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

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
