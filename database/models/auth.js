const client = require('../index');

const find = function (username, password) {
  return client.query(`
    SELECT *
    FROM auth
    WHERE username = '${username}'
    AND password = '${password}'
  `)
    .then((data) => data.rows)
    .catch((err) => console.error('Query Error', err));
};

const add = function (username, email, password, type) {
  return client.query(`
    INSERT INTO auth (username, email, password, type)
    VALUES ('${username}', '${email}', '${password}', '${type}');
  `)
    .catch((err) => console.error('Insert Error', err));
};

module.exports = { find, add };
