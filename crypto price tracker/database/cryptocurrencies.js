const db = require('../config/database');

db.query(`
  CREATE TABLE IF NOT EXISTS cryptocurrencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    price DECIMAL(18, 2) NOT NULL
  )
  `, (err, results) => {
  if (err) {
    console.error('Error creating database tables:', err);
  } else {
    console.log('Database tables created');
  
  // Insert the new cryptocurrencies into the table
  db.query(`
  INSERT IGNORE INTO cryptocurrencies (name, symbol, price)
  VALUES 
    ('Ethereum', 'etheur', 0),
    ('Bitcoin', 'btcusdt', 0),
    ('Ethereum', 'ethusdt', 0),
    ('Ripple', 'xrpusdt', 0),
    ('Litecoin', 'ltcusdt', 0),
    ('Cardano', 'adausdt', 0),
    ('Binance Coin', 'bnbusdt', 0),
    ('Dogecoin', 'dogeusdt', 0),
    ('Polkadot', 'dotusdt', 0),
    ('Chainlink', 'linkusdt', 0)
    `, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting new cryptocurrencies:', insertErr);
      } else {
        console.log('New cryptocurrencies inserted');
      }

      // Close the database connection
      db.end();
    });
  }
});




