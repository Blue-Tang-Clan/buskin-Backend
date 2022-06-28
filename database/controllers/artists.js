const model = require('../models/artist');

module.exports = {

  postArtistEvent: (req, res) => {
    model.addEvent(req, res);
  },

  getArtistDetails: (req, res) => {
    model.get(req, res);
  },

  updateArtistProfile: (req, res) => {
    model.update(req, res);
  },

  deleteArtistEvent: (req, res) => {

  },
  putArtistEvent: (req, res) => {

  },
};

// const deleteArtistProfile
