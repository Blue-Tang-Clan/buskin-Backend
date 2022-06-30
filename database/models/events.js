const client = require('../index');

const calculateYards = (lat1, lon1, lat2, lon2) => {
  // Convert to radians
  const lon1Rad = lon1 / 57.29577951;
  const lon2Rad = lon2 / 57.29577951;
  const lat1Rad = lat1 / 57.29577951;
  const lat2Rad = lat2 / 57.29577951;

  const dlon = lon2Rad - lon1Rad;
  const dlat = lat2Rad - lat1Rad;

  const a = (Math.sin(dlat / 2) ** 2)
            + (Math.cos(lat1) * Math.cos(lat2))
            * (Math.sin(dlon / 2) ** 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6962560;

  // Calculate the result
  return c * r;
};

module.exports = {
  getAll: (req, res) => {
    client.query(`
      SELECT e.*, a.display_name
      FROM event e, artists a
      WHERE e.art_id = a.id
      LIMIT 200
    `)
      .then((data) => {
        res.statusCode = 200;
        res.end(JSON.stringify(data.rows));
      })
      .catch((err) => {
        res.status(500);
        console.log('GET All Events error: ', err);
        res.end(JSON.stringify(err));
      });
  },
  get: (req, res) => {
    client.query(`
      SELECT e.*, a.display_name
      FROM event e, artists a
      WHERE e.id = '${req.params.eventId}'
      AND e.art_id = a.id
    `)
      .then((data) => {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.status(500);
        console.log(`GET Event ${req.params.eventId} error: `, err);
        res.end(JSON.stringify(err));
      });
  },
  checkEventConflict: (req, res) => {
    let { latitude, longitude, date, start_time } = req.query;
    latitude = decodeURI(latitude);
    longitude = decodeURI(longitude);
    date = decodeURI(date);
    start_time = decodeURI(start_time);

    const lonRange = 0.0003;
    const latRange = 0.00025;

    client.query(`
      SELECT event.id, auth.email, artists.display_name
      FROM event
      INNER JOIN artists
      ON artists.id = event.art_id
      INNER JOIN auth
      on auth.id = artists.auth_id
      WHERE longitude <= ${longitude} + ${lonRange} AND longitude >= ${longitude} - ${lonRange}
        AND latitude <= ${latitude} + ${latRange} AND latitude >= ${latitude} - ${latRange}
        AND date = '${date}'
        AND start_time = '${start_time}'
    `)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => console.log('something went wrong', err));
  },
};
