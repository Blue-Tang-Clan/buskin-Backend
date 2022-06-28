const router = require('express').Router();
const auth = require('../database/controllers/auth');
const artist = require('../database/controllers/artists');
const fans = require('../database/controllers/fans');
const events = require('../database/controllers/events');

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
router.get('/artist/profile/:artist_id', artist.getArtistProfile);
router.post('/artists/event/:artist_id', artist.postArtistEvent);
router.put('/artists/event/:artist_id', artist.putArtistEvent);
router.delete('/artists/event/:artist_id', artist.deleteArtistEvent);

// Routes for Fans
// Save Event
router.post('/fans/event', fans.saveEvent);
// Remove Event
router.delete('/fans/event/:fanId/:eventId', fans.removeEvent);
// Follow Artist
router.post('/fans/follow', fans.followArtist);
// Unfollow Artist
router.delete('/fans/follow/:fanId/:artistId', fans.unfollowArtist);
// Modify Profile
router.put('/fan/profile/:fanId', fans.put);
// Get fans dash board information
router.get('/fan/dashboard/:fanId', fans.get);

// All events
router.get('/events/:date', events.getAll);
// Singular
router.get('/event/:eventId', events.getEvent);

module.exports = router;
