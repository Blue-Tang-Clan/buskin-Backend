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
  .then(() => {
    client.query('SELECT * FROM auth;')
      .then((data) => console.log('should return matching rows', data.rows))
      .catch((err) => console.error('query error', err.stack));
  })
  .catch((err) => console.error('connection error', err.stack));

module.export = client;
