var models = require('../models');

module.exports = {
  get: function(req, res) {
    models.fans.get(req, res)
  },
  saveEvent: function(req, res) {
    models.fans.saveEvent(req, res);
  },
  followArtist: function(req, res) {
    models.fans.followArtist(req, res);
  },
  put: function(req, res) {
    models.fans.put(req, res);
  },
  removeEvent: function(req, res) {
    models.fans.removeEvent(req, res);
  },
  unfollowArtist: function(req, res) {
    models.fans.removeEvent(req, res);
  }
}