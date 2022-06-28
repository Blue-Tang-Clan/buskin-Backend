const client = require('../index');

module.exports = {
  get: function(req, res) {
    client.query(`
      SELECT json_build_object(
       'username', (SELECT username FROM authentication a WHERE a.id = f.authentication_id),
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
                'event_timestamp', e.timestamp,
                'event_start_time', e.start_time,
                'event_end_time', e.end_time
              )
            )
          )
          FROM event_fan ef, events e
          WHERE ef.events_id = e.id
          AND ef.fans_id = '${req.params.fanId}'
          GROUP BY ef.fans_id
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
          FROM artist_fan af, artist a
          WHERE af.artists_id = a.id
          AND af.fans_id = '${req.params.fanId}'
          GROUP BY af.fans_id
        )
      )
      FROM fans f
      WHERE f.id = '${req.params.fanId}'
    `)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500);
      console.log('GET Fan Info error: ', err);
      res.end(JSON.stringify(err));
    });
  },
  saveEvent: function(req, res) {
    client.query(`INSERT INTO event_fan
                  (fans_id, events_id)
                  VALUES
                  (${req.body.id}, ${req.body.event_id})`)
    .then(() => res.sendStatus(201);)
    .catch(err => {
      console.log('Save Event Fan error: ', err);
      res.status(500);
      res.end(JSON.stringify(err));
    });
  },
  followArtist: function(req, res) {
    client.query(`INSERT INTO artist_fan
                  (fans_id, artists_id)
                  VALUES
                  (${req.body.id}, ${req.body.artist_id})`)
    .then(() => res.sendStatus(201);)
    .catch(err => {
      console.log('Follow Artist Fan error: ', err);
      res.status(500);
      res.end(JSON.stringify(err));
    });
  },
  put: function(req, res) {
    client.query(`UPDATE fans
                  SET street = ${req.body.street},
                      city = ${req.body.city},
                      state = ${req.body.state}
                  WHERE id = ${req.params.fanId}`)
    .then(() => res.sendStatus(204);)
    .catch(err => {
      console.log('Update profile Fan error: ', err);
      res.status(500);
      res.end(JSON.stringify(err));
    });
  },
  removeEvent: function(req, res) {
    client.query(`DELETE FROM event_fan
                  WHERE fans_id = ${req.params.fanId}
                  AND events_id = ${req.params.eventId} `)
    .then(() => res.sendStatus(201);)
    .catch(err => {
      console.log('Remove event Fan error: ', err);
      res.status(500);
      res.end(JSON.stringify(err));
    });
  },
  unfollowArtist: function(req, res) {
    client.query(`DELETE FROM artist_fan
                  WHERE fans_id = ${req.params.fanId}
                  AND artists_id = ${req.params.artistId} `)
    .then(() => res.sendStatus(201);)
    .catch(err => {
      console.log('Unfollow artist Fan error: ', err);
      res.status(500);
      res.end(JSON.stringify(err));
    });
  }
}