const model = require('../models/artist');

module.exports = {

  postArtistEvent: (req, res) => {
    // Insert into events table event info
    // Insert into artist_events join table artist id and event id
  },

  getArtistDetails: (req, res) => {
    console.log('req', req);
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
