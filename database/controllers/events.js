var models = require('../models');

module.exports = {
  getAll: function(req, res) {
    models.events.getAll(req, res)
  },
<<<<<<< HEAD
  getEvent: function(req, res) {
    models.events.getEvent(req, res);
=======
  get: function(req, res) {
    models.events.get(req, res);
>>>>>>> ae9655659edfb89ce61fbd74e3fb089f70480e5a
  }
}