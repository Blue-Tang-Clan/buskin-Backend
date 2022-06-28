var models = require('../models');

module.exports = {
  getAll: function(req, res) {
    models.events.getAll(req, res)
  },
  get: function(req, res) {
    models.events.get(req, res);
  }
}