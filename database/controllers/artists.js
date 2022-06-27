const { query } = require('express');
const artist = require('../models/artist');

module.exports = {

  postArtistEvent: (req, res) => {
    // Insert into events table event info
    // Insert into artist_events join table artist id and event id

  },

  getArtistProfile: (req, res) => {

  },

  putArtistProfile: (req, res) => {

  },
 

  deleteArtistEvent: (req, res) => { artist.deleteArtistEvent(req, res) },
  putArtistEvent: (req, res) => { artist.putArtistEvent(req, res) }
};

// const deleteArtistProfile

