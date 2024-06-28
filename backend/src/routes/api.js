const axios = require('axios');
const express = require('express');
const router = express.Router();

// Route to fetch AXS/USDT data
router.get('/axs-usdt', async (req, res) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
            params: {
                symbol: 'AXSUSDT'
            }
        });
        const axsPrice = parseFloat(response.data.price);
        res.json({ pair: 'AXSUSDT', price: axsPrice });
    } catch (error) {
        console.error('Error fetching AXS/USDT price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch EOS/USDT data
router.get('/eos-usdt', async (req, res) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
            params: {
                symbol: 'EOSUSDT'
            }
        });
        const eosPrice = parseFloat(response.data.price);
        res.json({ pair: 'EOSUSDT', price: eosPrice });
    } catch (error) {
        console.error('Error fetching EOS/USDT price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to calculate ratio AXS/USDT / EOS/USDT
router.get('/ratio', async (req, res) => {
    try {
        // Fetch AXS/USDT price
        const responseAXS = await axios.get('https://api.binance.com/api/v3/ticker/price', {
            params: {
                symbol: 'AXSUSDT'
            }
        });
        const axsPrice = parseFloat(responseAXS.data.price);

        // Fetch EOS/USDT price
        const responseEOS = await axios.get('https://api.binance.com/api/v3/ticker/price', {
            params: {
                symbol: 'EOSUSDT'
            }
        });
        const eosPrice = parseFloat(responseEOS.data.price);

        // Calculate ratio
        const ratio = axsPrice / eosPrice;

        // Send ratio as JSON response
        res.json({ ratio: ratio });
    } catch (error) {
        console.error('Error calculating ratio:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
