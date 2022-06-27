const client = require('../index');

const artist = {
  get: (req, res) => (
    client.query(`
      SELECT *
      FROM artists
      WHERE id = '${req.params.artist_id}'
    `)
      .then((data) => { console.log('req', req); return res.status(200).send(data.rows); })
      .catch((err) => res.status(500).send('Internal Server Error', err))
  ),
  update: (req, res) => (
    client.query(`
      UPDATE artists
      SET displayName = '${req.body.displayName}',
        instrument = '${req.body.instrument}',
        genre = '${req.body.genre}',
        bio = '${req.body.bio}',
        picture = '${req.body.picture}',
        paymentMethod = '${req.body.paymentMethod}',
    `)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err))
  ),
};

module.exports = artist;
