const homePage = require('../models/homePage');

module.exports = {
  getHomePageInfo: (req, res) => { homePage.getHomePageInfo(req, res); },
  getHomePageGenre: (req, res) => { homePage.getHomePageGenre(req, res); },
};
