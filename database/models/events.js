/* eslint-disable camelcase */
const client = require('../index');

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
    let {
      latitude, longitude, date, start_time,
    } = req.query;
    latitude = decodeURI(latitude);
    longitude = decodeURI(longitude);
    date = decodeURI(date);
    start_time = decodeURI(start_time);

    const range = 0.0003;

    client.query(`
      SELECT
      array_to_json(
        array_agg((SELECT auth.email FROM auth WHERE auth.id = e.art_id))
      )
      FROM event e
      WHERE e.longitude <= ${longitude} + ${range} AND longitude >= ${longitude} - ${range}
        AND e.latitude <= ${latitude} + ${range} AND latitude >= ${latitude} - ${range}
        AND e.date = '${date}'
        AND e.start_time = '${start_time}'
    `)
      .then((data) => res.status(200).send(data.rows[0].array_to_json))
      .catch((err) => console.log('something went wrong', err));
  },
};
