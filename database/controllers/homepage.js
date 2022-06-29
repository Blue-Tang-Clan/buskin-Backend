const homePage = require('../models/homePage');

module.exports = {
  getHomePageInfo: (req, res) => { homePage.getHomePageInfo(req, res); },
  getHomePageGenre: (req, res) => { homePage.getHomePageGenre(req, res); },
  searchHomePageGenre: (req, res) => { homePage.searchHomePageGenre(req, res); },
  geteDefaultGenre: (req, res) => { homePage.geteDefaultGenre(req, res); },
};
