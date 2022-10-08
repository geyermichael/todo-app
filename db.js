const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const res = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    });

    console.log('Database connection established.');
    return res;
  } catch (error) {
    console.error('Error: Database connection could not be established');
    console.error(`ErrorMessage: ${error}`);
  }
}

const db = connectToDatabase();

module.exports = db;
