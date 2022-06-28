const client = require('../index');

module.exports = {
  getAll: function(req, res) {
<<<<<<< HEAD

    client.query(`
      SELECT *
      FROM events
      LIMIT 100
=======
    client.query(`
      SELECT *
      FROM events e
      LIMIT 50
>>>>>>> ae9655659edfb89ce61fbd74e3fb089f70480e5a
    `)
    .then((data) => {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500);
<<<<<<< HEAD
      console.log('GET Events error: ', err);
      res.end(JSON.stringify(err));
    });
  },
  saveEvent: function(req, res) {
=======
      console.log('GET All Events error: ', err);
      res.end(JSON.stringify(err));
    });
  },
  get: function(req, res) {
>>>>>>> ae9655659edfb89ce61fbd74e3fb089f70480e5a
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
<<<<<<< HEAD
      console.log(`GET Event ID ${req.params.eventId} error: `, err);
      res.end(JSON.stringify(err));
    });
  }
  }
=======
      console.log(`GET Event ${req.params.eventId} error: `, err);
      res.end(JSON.stringify(err));
    });
  }
>>>>>>> ae9655659edfb89ce61fbd74e3fb089f70480e5a
}