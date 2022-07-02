const client = require('../index');

module.exports = {
  get: (req, res) => {
    client.query(`
      SELECT json_build_object(
        'username', (SELECT username FROM auth a WHERE a.id = f.auth_id),
        'address', (SELECT
          json_build_object(
            'city', f.city,
            'state', f.state,
            'street', f.street
          )
          FROM fans f
          WHERE f.id = '${req.params.fanId}'
        ),
        'events', (SELECT
          array_to_json(
            array_agg(
              json_build_object(
                'event_id', e.id,
                'event_name', e.name,
                'event_street', e.street,
                'event_city', e.city,
                'event_state', e.state,
                'event_longitude', e.longitude,
                'event_latitude', e.latitude,
                'event_date', e.date,
                'event_start_time', e.start_time,
                'event_end_time', e.end_time,
                'event_pic', e.pic
              )
            )
          )
          FROM event_fan ef, event e
          WHERE ef.event_id = e.id
          AND ef.fan_id = '${req.params.fanId}'
          GROUP BY ef.fan_id
        ),
        'artists', (SELECT
          array_to_json(
            array_agg(
              json_build_object(
                'artist_id', a.id,
                'artist_display_name', a.display_name,
                'artist_instrument', a.instrument,
                'artist_genre', a.genre,
                'artist_bio', a.bio,
                'artist_pic', a.pic,
                'artist_venmo', a.venmo,
                'artist_paypal', a.paypal,
                'artist_cashapp', a.cashapp,
                'artist_fan_num', a.fan_num
              )
            )
          )
          FROM art_fan af, artists a
          WHERE af.art_id = a.id
          AND af.fan_id = '${req.params.fanId}'
          GROUP BY af.fan_id
        )
      )
      FROM fans f
      WHERE f.id = '${req.params.fanId}'
    `)
      .then((data) => {
        res.statusCode = 200;
        res.end(JSON.stringify(data.rows[0].json_build_object));
      })
      .catch((err) => {
        res.status(500);
        console.log('GET Fan Info error: ', err);
        res.end(JSON.stringify(err));
      });
  },

  saveEvent: (req, res) => {
    client.query(`SELECT * FROM event_fan WHERE fan_id = ${req.body.id} AND event_id = ${req.body.event_id}`)
      .then((data) => {
        console.log(data.rows);
        if (!data.rows.length) {
          client.query(`INSERT INTO event_fan
                        (fan_id, event_id)
                        VALUES
                        (${req.body.id}, ${req.body.event_id})`)
            .then(() => res.sendStatus(201))
            .catch((err) => {
              console.log('Save Event Fan error: ', err);
              res.status(500);
              res.end(JSON.stringify(err));
            });
        } else {
          res.sendStatus(201);
        }
      })
      .catch((err) => {
        console.log('Save Event Fan error: ', err);
        res.status(500);
        res.end(JSON.stringify(err));
      });
  },

  followArtist: (req, res) => {
    client.query(`INSERT INTO art_fan
                  (fan_id, art_id)
                  VALUES
                  (${req.body.id}, ${req.body.artist_id})`)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Follow Artist Fan error: ', err);
        res.status(500);
        res.end(JSON.stringify(err));
      });
  },

  put: (req, res) => {
    client.query(`UPDATE fans
                  SET street = ${req.body.street},
                      city = ${req.body.city},
                      state = ${req.body.state}
                  WHERE id = ${req.params.fanId}`)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('Update profile Fan error: ', err);
        res.status(500);
        res.end(JSON.stringify(err));
      });
  },

  removeEvent: (req, res) => {
    client.query(`DELETE FROM event_fan
                  WHERE fan_id = ${req.params.fanId}
                  AND event_id = ${req.params.eventId} `)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Remove event Fan error: ', err);
        res.status(500);
        res.end(JSON.stringify(err));
      });
  },

  unfollowArtist: (req, res) => {
    client.query(`DELETE FROM art_fan
                  WHERE fan_id = ${req.params.fanId}
                  AND art_id = ${req.params.artistId} `)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Unfollow artist Fan error: ', err);
        res.status(500);
        res.end(JSON.stringify(err));
      });
  },
};
