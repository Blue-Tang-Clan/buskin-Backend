const client = require('../index');

const search = {
  get: (req, res) => {
    let { query } = req.query;
    query = query.toLowerCase();
    client.query(`
      SELECT json_build_object(
        'artists', (
          SELECT array_to_json(array_agg(json_build_object(
          'id', a.id,
          'name', a.display_name,
          'pic', a.pic )))
          FROM artists a
          WHERE lower(a.display_name) LIKE '%${query}%'
          OR lower(a.instrument) LIKE '%${query}%'
          OR lower(a.genre) LIKE '%${query}%'
        ),
        'event', (
          SELECT array_to_json(array_agg(json_build_object(
          'id', e.id,
          'name', e.name,
          'city', e.city,
          'state', e.state,
          'pic', e.pic )))
          FROM event e
          WHERE lower(e.name) LIKE '%${query}%'
          OR lower(e.city) LIKE '%${query}%'
          OR lower(e.street) LIKE '%${query}%'
          OR lower(e.state) LIKE '%${query}%'
        )
        )`)
      .then((data) => { res.status(200).json(data.rows[0]); })
      .catch((err) => { res.status(500).send(err); });
  },
};

module.exports = search;
