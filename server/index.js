const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// All requests are handled in the routes.js file
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`successful connected to ${port}`);
});
