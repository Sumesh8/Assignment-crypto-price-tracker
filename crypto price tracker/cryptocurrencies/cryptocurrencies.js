const WebSocket = require('ws');
const cron = require('node-cron');
const pool = require("../config/database");

const cryptoPairs = [
  'etheur', 'btcusdt', 'ethusdt', 'xrpusdt', 'ltcusdt',
  'adausdt', 'bnbusdt', 'dogeusdt', 'dotusdt', 'linkusdt'
];

let cryptoPrices = {
  'etheur' : 0,
  'btcusdt': 0,
  'ethusdt': 0,
  'xrpusdt': 0,
  'ltcusdt': 0,
  'bnbusdt': 0,
  'adausdt': 0,
  'dogeusdt': 0,
  'dotusdt': 0,
  'linkusdt': 0,
};

const updateCryptoPrice = (pair, price) => {
    const updateQuery = 'UPDATE cryptocurrencies SET price = ? WHERE symbol = ?';

    pool.query(updateQuery, [price, pair.toUpperCase()], (err, results) => {
        if (err) {
            console.error(`Error updating database for ${pair}:`, err);
        } else {
            console.log(`Database updated for ${pair}`);
        }
    });
};

const connections = cryptoPairs.map(pair => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

  ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    cryptoPrices[pair] = stockObject.p;
  };

  ws.on('error', (error) => {
    console.error(`WebSocket error for ${pair}: ${error.message}`);
  });

  ws.on('close', (code, reason) => {
    console.log(`WebSocket closed for ${pair} with code ${code} and reason: ${reason}`);
  });

  return ws;
});


const updateCryptoPrices = () => {
  cryptoPairs.forEach(pair => {
    updateCryptoPrice(pair, cryptoPrices[pair]);
  });
};

// Export the cryptoPrices object
module.exports = {
  updateCryptoPrices : updateCryptoPrices
};
