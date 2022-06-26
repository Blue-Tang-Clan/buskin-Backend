const client = require('../index');

const find = function (username, password) {
  return client.query(`
    SELECT *
    FROM auth
    WHERE username = ${username}
    AND password = ${password}
    `)
    .then((data) => data.rows)
    .catch((err) => console.error('Query Error', err));
};

module.exports = { find };
