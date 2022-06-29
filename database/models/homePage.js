const client = require('../index');

const homePage = {
  getHomePageInfo: (req, res) => {
    const randomArtistId = Math.floor(Math.random() * 50);
    const { longitude, latitude } = req.params;
    const range = 20;
    client.query(`
      SELECT json_build_object(
        'events', (
          SELECT array_to_json(array_agg(json_build_object(
            'id', e.id,
            'event_name', e.name,
            'street', e.street,
            'city', e.city,
            'state', e.state,
            'longitude', e.longitude,
            'latitude', e.latitude,
            'date', e.date,
            'start_time', e.start_time,
            'end_time', e.end_time,
            'description', e.description,
            'pic', e.pic )))
          FROM (
              SELECT * FROM event 
              WHERE date::date >= CURRENT_DATE
              AND longitude <= ${longitude} + ${range} AND longitude >= ${longitude} - ${range}
              AND latitude <= ${latitude} + ${range} AND latitude >= ${latitude} - ${range}
              ORDER BY date, start_time DESC
              LIMIT 5
          ) AS e
        ),
        'artists', (
          SELECT array_to_json(array_agg(json_build_object(
            'id', a.id,
            'artist_name', a.display_name,
            'instrument', a.instrument,
            'genre', a.genre,
            'bio', a.bio,
            'pic', a.pic,
            'venmo', a.venmo,
            'paypal', a.paypal,
            'cashapp', a.cashapp,
            'fan_num', a.fan_num
          )))
          FROM (
            SELECT * FROM artists
            ORDER BY fan_num DESC
            LIMIT 5
          ) AS a
        ),
        'talent', (
          SELECT json_build_object(
            'id', a.id,
            'artist_name', a.display_name,
            'instrument', a.instrument,
            'genre', a.genre,
            'bio', a.bio,
            'pic', a.pic,
            'venmo', a.venmo,
            'paypal', a.paypal,
            'cashapp', a.cashapp,
            'fan_num', a.fan_num )
          FROM artists a
          WHERE a.id = ${randomArtistId}
        )
      ) 
    `)
      .then((result) => res.status(200).json(result.rows[0].json_build_object))
      .catch((err) => res.status(500).json(err));
  },
  getHomePageGenre: (req, res) => {
    client.query(`
      SELECT DISTINCT UPPER(genre) AS genres
      FROM artists
      WHERE genre IS NOT null AND genre != 'undefined'
    `)
      .then((result) => res.status(200).json(result.rows))
      .catch((err) => res.status(500).json(err));
  },
  searchHomePageGenre: (req, res) => {
    const { genre } = req.params;
    client.query(`
      SELECT id, display_name AS artist_name, instrument, genre, bio, pic, venmo, paypal, cashapp, fan_num 
      FROM artists a
      WHERE UPPER(a.genre) LIKE UPPER('%${genre}%')
    `)
      .then((result) => res.status(200).json(result.rows))
      .catch((err) => res.status(500).json(err));
  },
  geteDefaultGenre: (req, res) => {
    const genre = 'pop';
    client.query(`
      SELECT id, display_name AS artist_name, instrument, genre, bio, pic, venmo, paypal, cashapp, fan_num 
      FROM artists a
      WHERE UPPER(a.genre) = UPPER('%${genre}%')
    `)
      .then((result) => res.status(200).json(result.rows))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = homePage;
