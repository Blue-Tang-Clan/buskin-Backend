const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
require('dotenv').config();

const app = express();
// app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`successful connected to ${port}`);
});
