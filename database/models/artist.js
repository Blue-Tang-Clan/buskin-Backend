const client = require('../index');
const upload = require('../../awsconfig.js');
const uploadImage = upload.single('image');

const artist = {
  get: (req, res) => {
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

  addEvent: (req, res) => {
    client.query(`
    INSERT INTO event (
      name, street, city, state, longitude, latitude, date, start_time, end_time, art_id
    )
    VALUES (
      '${req.body.name}', '${req.body.street}', '${req.body.city}', '${req.body.state}', ${req.body.longitude},
      ${req.body.latitude}, '${req.body.date}', '${req.body.start_time}', '${req.body.end_time}', ${req.params.artist_id}
    );
    `)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Insert error', err);
        res.sendStatus(400);
      });
  },

  update: async (req, res) => {
    const { picture } = req.body;
    let pictureUrl = '';




    function queryCaller() {
      const query = `
      UPDATE artists
      SET display_name = '${req.body.displayName}',
        instrument = '${req.body.instrument}',
        genre = '${req.body.genre}',
        bio = '${req.body.bio}',
        pic = '${pictureUrl}',
        venmo = '${req.body.venmo}',
        paypal = '${req.body.paypal}',
        cashapp = '${req.body.cashapp}'
      WHERE id = ${req.params.artist_id}
    `;
      console.log('the query', query);
      client.query(query)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          console.log(err)
          res.status(500).send(err)
        });
    }

    uploadImage(req, res, (err, some) => {
      if (err) {
        console.log('Error uploading image');
        res.end();
      } else {
        console.log('the request', req.file);
        pictureUrl = req.file.location;
        queryCaller();
      }
    });
    console.log('pic url', pictureUrl);
  },

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

module.exports = artist;
