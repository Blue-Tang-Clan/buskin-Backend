const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('dotenv').config();
const password = require('../emailconfig');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
// app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);

app.post('/send-email', async (req, res) => {
  // let testAccount = await nodeMailer.createTestAccount();
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user:'buskinfan@gmail.com',
      pass: password,
    },
  });
  const mailOptions = {
    from: 'buskingfan@gmail.com', // sender address
    bcc: 'kmzeinu@gmail.com, valpizzo2@gmail.com, nikkoelliott@gmail.com, utkucozkan@gmail.com, fangzhuoxi93@gmail.com, amyyuyao.thu@gmail.com, ykdong1991@gmail.com, tcb.yukiogawa@gmail.com', // list of receivers
    subject: 'Val and Kedir say hi', // Subject line
    text: 'lets work on email notification. If it works, you wont see who we sent to other than you', // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending: ', error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("index");
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`successful connected to ${port}`);
});
