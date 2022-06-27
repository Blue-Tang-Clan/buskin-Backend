const client = require('../index');

const artist = {
  deleteArtistEvent: (req, res) => {
    const fanId = req.body.fanId;
    const artistId = req.params.artistId;
    client.query(`DELETE FROM artist_fan
                  WHERE artist_id = ${artistId} AND fans_id = ${fanId};`)
    .then((result) => res.sendStatus(201))
    .catch((err) => res.status(500).json(err));
  },
  putArtistEvent: (req, res) => {
    client.query(`UPDATE events
                  SET name = '${req.body.name}',
                      street = '${req.body.street}',
                      city = '${req.body.city}',
                      state = '${req.body.statee}',
                      longitude = ${req.body.longitude},
                      latitude = ${req.body.latitude},
                      time = ${req.body.time},
                  WHERE artists_id = ${req.params.artistId};`)
    .then((result)=> res.sendStatus(201))
    .catch((err) => res.status(500).json(err));
  }
};

module.exports =  artist;