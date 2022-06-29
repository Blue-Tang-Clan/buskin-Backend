const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    models.events.getAll(req, res);
  },
  get: (req, res) => {
    models.events.get(req, res);
  },
  checkEventConflict: (req, res) => {
    models.events.checkEventConflict(req, res);
  },
};
