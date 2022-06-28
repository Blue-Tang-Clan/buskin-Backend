const client = require('../index');

module.exports = {
  getAll: function(req, res) {

    client.query(`
      SELECT *
      FROM events
      LIMIT 100
    `)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500);
      console.log('GET Events error: ', err);
      res.end(JSON.stringify(err));
    });
  },
  saveEvent: function(req, res) {
    client.query(`
      SELECT *
      FROM events e
      WHERE e.id = '${req.params.eventId}'
    `)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500);
      console.log(`GET Event ID ${req.params.eventId} error: `, err);
      res.end(JSON.stringify(err));
    });
  }
  }
}