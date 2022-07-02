const artist = require('../models/artist');

module.exports = {
  getArtistDetails: (req, res) => { artist.get(req, res); },

  updateArtistProfile: (req, res) => { artist.update(req, res); },

  postArtistEvent: (req, res) => { artist.addEvent(req, res); },

  putArtistEvent: (req, res) => { artist.putArtistEvent(req, res); },

  deleteArtistEvent: (req, res) => { artist.deleteArtistEvent(req, res); },
};
