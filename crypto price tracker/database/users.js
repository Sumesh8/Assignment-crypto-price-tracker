const db = require("../config/database");

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255)  UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
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