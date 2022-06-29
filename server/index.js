const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`successful connected to ${port}`);
});
