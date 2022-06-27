const router = require('express').Router();
const auth = require('../database/controllers/auth');

router.get('/auth', (req, res) => {
  const { username, password } = req.query;

  auth.find(username, password)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send('Internal Server Error', err));
});

router.post('/auth', (req, res) => {
  const {
    username, email, password, type,
  } = req.body;

  auth.add(username, email, password, type)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send('Internal Server Error', err));
});

module.exports = router;
