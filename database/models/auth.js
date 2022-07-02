const client = require('../index');
// <---- AUTHENTICATION QUERIES ----->
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
  VALUES ('${authId}') RETURNING id;
`)
);

const addOneFan = (authId) => (
  client.query(`
  INSERT INTO fans (auth_id)
  VALUES ('${authId}') RETURNING id;
`)
);

const findArtistId = (authId) => (
  client.query(`
  SELECT id, pic FROM artists WHERE auth_id = ${authId};
`)
);

const findFanId = (authId) => (
  client.query(`
  SELECT id FROM fans WHERE auth_id = ${authId};
`)
);

module.exports = {
  findUser,
  addUser,
  addOneArtist,
  addOneFan,
  findArtistId,
  findFanId,
};
