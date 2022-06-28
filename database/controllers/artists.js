const { query } = require('express');
const artist = require('../models/artist');

module.exports = {

  postArtistEvent: (req, res) => {
    artist.addEvent(req, res);
  },

  getArtistDetails: (req, res) => {
    artist.get(req, res);
  },

  updateArtistProfile: (req, res) => {
    artist.update(req, res);
  },
  
  deleteArtistEvent: (req, res) => { artist.deleteArtistEvent(req, res) },
  
  putArtistEvent: (req, res) => { artist.putArtistEvent(req, res) }
};

// const deleteArtistProfile
