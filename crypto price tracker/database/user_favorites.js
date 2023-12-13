const db = require("../config/database");

db.query(`
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL UNIQUE,
    cryptoSymbols VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
  `, (err, results) => {
  if (err) {
    console.error('Error creating database tables:', err);
  } else {
    console.log('Database tables created');
  }

  // Close the database connection
  db.end();
});



