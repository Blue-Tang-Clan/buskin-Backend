const { query } = require('express');
const model = require('../models');
const client = require('../index');

module.exports = {

  postArtistEvent: (req, res) => {
    // Insert into events table event info
    // Insert into artist_events join table artist id and event id

  },

  getArtistProfile: (req, res) => {

  },

  putArtistProfile: (req, res) => {

  },

  deleteArtistEvent: (req, res) => {
    // DELETE FROM table
    // WHERE condition;
    const fanId = req.body.fans_id;
    const artistId = req.body.artist_id;
    
  },
  putArtistEvent: (req, res) => {

  },
};

// const deleteArtistProfile

