const model = require('../models/artist');

module.exports = {

  postArtistEvent: (req, res) => {
    // Insert into events table event info
    // Insert into artist_events join table artist id and event id
  },

  getArtistProfile: (req, res) => {
    model.get(req, res);
  },

  putArtistProfile: (req, res) => {
    model.update(req, res);
  },

  deleteArtistEvent: (req, res) => {

  },
  putArtistEvent: (req, res) => {

  },
};

// const deleteArtistProfile
