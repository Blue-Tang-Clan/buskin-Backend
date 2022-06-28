const router = require('express').Router();
const auth = require('../database/controllers/auth');
const artist = require('../database/controllers/artists');
// const fans = require('../database/controllers/fans');

router.get('/auth', (req, res) => {
  const { username, password } = req.query;

  auth.find(username, password)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send('Internal Server Error', err));
});

router.post('/auth', (req, res) => {
  const {
    username, email, password, type,
  } = req.body;

  auth.add(username, email, password, type)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send('Internal Server Error', err));
});

// Routes for Artists
router.get('/artist/details/:artist_id', artist.getArtistDetails);

router.put('/artist/profile/:artist_id', artist.updateArtistProfile);

router.post('/artists/event/:artist_id', artist.postArtistEvent);

// Routes for Fans
// Save Event
// router.post('/fans/event/:fan_id', fans.saveEvent);
// Remove Event
// router.put('/fans/event/:fan_id', fans.removeEvent);
// Follow Artist
// router.post('/fans/follow/:fan_id', fans.followArtist);
// Unfollow Artist
// router.('/fans/follow/:fan_id', fans.followArtist);
// Get Profile
// router.get('/fan/profile/:fan_id', fans.getProfile);
// Modify Profile
// router.put('/fan/profile/:fan_id', fans.put);
// Get fans dash board information
// router.get('/fan/dashboard/:fan_id', fans.getDashBoard);

module.exports = router;
