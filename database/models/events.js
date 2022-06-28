const client = require('../index');

module.exports = {
  getAll: function(req, res) {
    client.query(`
      SELECT *
      FROM event e
      LIMIT 50
    `)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500);
      console.log('GET All Events error: ', err);
      res.end(JSON.stringify(err));
    });
  },
  get: function(req, res) {
    client.query(`
      SELECT *
      FROM event e
      WHERE e.id = '${req.params.eventId}'
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
  }
}