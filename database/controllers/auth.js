const model = require('../models');

module.exports = {
  registerUser: (req, res) => {
    // Insert username email password into auth table
    // Insert auth id into either fan table or artist table
  },

  loginUser: (req, res) => {
    // Select from auth table where username and password match
    // return matching row (if any)
  },

};
