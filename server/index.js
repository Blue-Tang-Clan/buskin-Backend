const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`successful connected to ${port}`);
});

/* Testing connection to database and querying  */
const auth = require('../database/controllers/auth');

auth.find('yuki', '123thumbwar')
  .then((data) => console.log('Query Result', data))
  .catch((err) => console.error('Query Error', err));
