const client = require('../index');

const findUser = (username) => (
  client.query(`
    SELECT *
    FROM auth
    WHERE username = '${username}'
  `)
);

const addUser = (username, email, password, type) => (
  client.query(`
    INSERT INTO auth (username, email, password, type)
    VALUES ('${username}', '${email}', '${password}', '${type}') RETURNING id;
  `)
);

const addOneArtist = (authId) => (
  client.query(`
  INSERT INTO artists (auth_id)
  VALUES ('${authId}');
`)
);

const addOneFan = (authId) => (
  client.query(`
  INSERT INTO fans (auth_id)
  VALUES ('${authId}');
`)
);

module.exports = {
  findUser,
  addUser,
  addOneArtist,
  addOneFan,
};
