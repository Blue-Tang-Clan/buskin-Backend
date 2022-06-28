var models = require('../models');

module.exports = {
  getAll: function(req, res) {
    models.events.getAll(req, res)
  },
  getEvent: function(req, res) {
    models.events.getEvent(req, res);
  }
}