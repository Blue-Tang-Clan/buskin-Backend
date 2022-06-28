const router = require('express').Router();
const auth = require('../database/controllers/auth');
const artist = require('../database/controllers/artists');
const fans = require('../database/controllers/fans');
const events = require('../database/controllers/events');

// Routes for Artists
router.get('/artist/details/:artist_id', artist.getArtistDetails);

router.put('/artist/profile/:artist_id', artist.updateArtistProfile);

router.post('/artist/event/:artist_id', artist.postArtistEvent);

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

<<<<<<< HEAD
// All events
router.get('/events/:date', events.getAll);
// Singular
router.get('/event/:eventId', events.getEvent);
=======
// register and login user
router.get('/events/:date', events.getAll);
router.get('/event/:eventId', events.get);

// register and login user
router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);
>>>>>>> ae9655659edfb89ce61fbd74e3fb089f70480e5a

module.exports = router;
