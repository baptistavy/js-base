// src/config/database.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("DATABASE_URL in database.js =", process.env.DATABASE_URL);

module.exports = pool;