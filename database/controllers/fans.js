const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.fans.get(req, res);
  },
  saveEvent: (req, res) => {
    models.fans.saveEvent(req, res);
  },
  followArtist: (req, res) => {
    models.fans.followArtist(req, res);
  },
  put: (req, res) => {
    models.fans.put(req, res);
  },
  removeEvent: (req, res) => {
    models.fans.removeEvent(req, res);
  },
  unfollowArtist: (req, res) => {
    models.fans.unfollowArtist(req, res);
  },
};
