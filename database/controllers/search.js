const search = require('../models/search');

module.exports = {
  getSearchInfo: (req, res) => { search.get(req, res); },
};
