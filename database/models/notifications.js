const nodeMailer = require('nodemailer');
require('dotenv').config();

const notifications = {
  sendEventNotification: (req, res) => {
    const { receivers, subject, text } = req.body;
    console.log(receivers, subject, text, process.env.PASSWORD)
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'buskinfan@gmail.com',
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: 'buskingfan@gmail.com', // sender address
      bcc: receivers, // list of receivers
      subject, // Subject line
      text, // plain text body
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.sendStatus(201);
    });
  },
};
module.exports = notifications;
