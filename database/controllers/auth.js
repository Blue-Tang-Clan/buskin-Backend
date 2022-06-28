const {
  findUser,
  addUser,
  addOneArtist,
  addOneFan,
} = require('./../models/auth');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  registerUser: (req, res) => {
    const {
      username,
      password,
      email,
      userType,
    } = req.body;
    const saltRounds = 10;
    // hash password
    bcrypt.hash(password, saltRounds)
      .then((hash) => (addUser(username, email, hash, userType)
      ))
      .then((data) => {
        const { id } = data.rows[0];
        if (userType === 'artist') {
          // add new artist
          return addOneArtist(id);
        }
        // add new fan
        return addOneFan(id);
      })
      .then((data) => {
        const userId = data.rows[0].id;
        res.status(201).send({ userId, username, userType });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  loginUser: (req, res) => {
    const { username, password } = req.body;
    findUser(username)
      .then((data) => {
        // if any data returned match username
        if (data.rows.length === 0) {
          res.status(400).send('Wrong Username or Password');
        } else {
          const user = data.rows[0];
          // compare password with the ones in table
          bcrypt.compare(password, user.password)
            .then((pass) => {
              if (!pass) {
                res.status(400).send('Wrong Username or Password');
              } else {
                res.status(201).send({ id: user.id, username: user.username, userType: user.type });
              }
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
