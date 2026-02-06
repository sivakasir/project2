// services/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Siva8688',
  port: 5432,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connected successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Test connection on startup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connection test passed!');
    client.release();
  } catch (err) {
    console.error('❌ Database connection test failed:', err);
  }
};

testConnection();

module.exports = pool;