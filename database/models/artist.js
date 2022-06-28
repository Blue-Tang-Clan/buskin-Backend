const client = require('../index');

const artist = {
  get: (req, res) => {
    console.log('we get this far', req);
    client.query(`
      select json_build_object('id', a.id, 'name', a.display_name, 'bio', a.bio,
        'genre', a.genre, 'pic', a.pic, 'venmo', a.venmo, 'cashapp', a.cashapp, 'paypal', a.paypal,

        'events', (select array_to_json(array_agg(json_build_object('id', e.id, 'name', e.name, 'street', e.street,
        'city', e.city, 'state', e.state, 'latitude', e.latitude, 'longitude', e.longitude, 'date', e.date,
        'start_time', e.start_time, 'end_time', e.end_time)))
        from event as e
        where e.art_id = ${req.params.artist_id}))

      from artists a
      where a.id = ${req.params.artist_id};
    `)
      .then((data) => {
        console.log('error here', data);
        res.status = 200;
        res.send(data);
      })
      .catch((err) => {
        res.sendStatus(400);
        console.log(err);
      });
  },

  update: (req, res) => (
    client.query(`
      UPDATE artists
      SET displayName = '${req.body.displayName}',
        instrument = '${req.body.instrument}',
        genre = '${req.body.genre}',
        bio = '${req.body.bio}',
        picture = '${req.body.picture}',
        paymentMethod = '${req.body.paymentMethod}',
      WHERE id = ${req.body.artist_id}
    `)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err))
  ),
};

module.exports = artist;

