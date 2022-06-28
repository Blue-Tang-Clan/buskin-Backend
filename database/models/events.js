const client = require('../index');

module.exports = {
  getAll: (req, res) => {
    client.query(`
      SELECT *, a.display_name
      FROM event e, artists a
      WHERE e.art_id = a.id
      LIMIT 50
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
      SELECT *, a.display_name
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
};
