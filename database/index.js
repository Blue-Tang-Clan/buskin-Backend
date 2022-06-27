require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error('connection error', err.stack));

module.exports = client;
