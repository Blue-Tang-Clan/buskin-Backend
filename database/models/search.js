const client = require('../index');

const search = {
  get: (req, res) => {
    const { query } = req.query;
    client.query(`
      SELECT json_build_object(
        'artists', (
          SELECT array_to_json(array_agg(json_build_object( 
          'id', a.id, 
          'name', a.display_name, 
          'pic', a.pic )))
          FROM artists a
          WHERE a.display_name LIKE '%${query}%'
          OR a.instrument LIKE '%${query}%'
          OR a.genre LIKE '%${query}%'
        ),
        'event', (
          SELECT array_to_json(array_agg(json_build_object(
          'id', e.id,
          'name', e.name,
          'city', e.city,
          'state', e.state,
          'pic', e.pic )))
          FROM event e
          WHERE e.name LIKE '%${query}%'
          OR e.city LIKE '%${query}%'
          OR e.street LIKE '%${query}%'
          OR e.state LIKE '%${query}%'
        )
        )`)
      .then((data) => { res.status(200).json(data.rows[0]); })
      .catch((err) => { res.status(500).send(err); });
  },
};

module.exports = search;
