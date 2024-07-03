const axios = require("axios");
const express = require("express");
const router = express.Router();

// Route to calculate ratio AXS/USDT / EOS/USDT
router.get("/ratio/eos", async (req, res) => {
  try {
    // Fetch AXS/USDT price
    const responseAXS = await axios.get(
      "https://api.binance.com/api/v3/ticker/price",
      {
        params: {
          symbol: "AXSUSDT",
        },
      }
    );
    const axsPrice = parseFloat(responseAXS.data.price);

    // Fetch EOS/USDT price
    const responseEOS = await axios.get(
      "https://api.binance.com/api/v3/ticker/price",
      {
        params: {
          symbol: "EOSUSDT",
        },
      }
    );
    const eosPrice = parseFloat(responseEOS.data.price);

    // Calculate ratio
    const ratio = axsPrice / eosPrice;

    // Send ratio as JSON response
    res.json({ ratio: ratio });
  } catch (error) {
    console.error("Error calculating ratio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to calculate ratio AXS/USDT / FIL/USDT
router.get("/ratio/fil", async (req, res) => {
  try {
    // Fetch AXS/USDT price
    const responseAXS = await axios.get(
      "https://api.binance.com/api/v3/ticker/price",
      {
        params: {
          symbol: "AXSUSDT",
        },
      }
    );
    const axsPrice = parseFloat(responseAXS.data.price);

    // Fetch FIL/USDT price
    const responseFIL = await axios.get(
      "https://api.binance.com/api/v3/ticker/price",
      {
        params: {
          symbol: "FILUSDT",
        },
      }
    );
    const filPrice = parseFloat(responseFIL.data.price);

    // Calculate ratio
    const ratio = axsPrice / filPrice;

    // Send ratio as JSON response
    res.json({ ratio: ratio });
  } catch (error) {
    console.error("Error calculating ratio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// export the module
module.exports = router;
