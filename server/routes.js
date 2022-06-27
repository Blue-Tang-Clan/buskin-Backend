const router = require('express').Router();
const auth = require('../database/controllers/auth');
const artist = require('../database/controllers/artists');
const fans = require('../database/controllers/fans');

// Routes for Artists
router.get('/artist/profile/:artist_id', artist.getArtistProfile);
router.post('/artists/event/:artist_id', artist.postArtistEvent);
router.put('/artists/event/:artist_id', artist.putArtistEvent);
router.delete('/artists/event/:artist_id', artist.deleteArtistEvent);

// Routes for Fans
// Save Event
router.post('/fans/event/:fan_id', fans.saveEvent);
// Remove Event
// router.put('/fans/event/:fan_id', fans.removeEvent);
// Follow Artist
router.post('/fans/follow/:fan_id', fans.followArtist);
// Unfollow Artist
// router.('/fans/follow/:fan_id', fans.followArtist);
// Get Profile
router.get('/fan/profile/:fan_id', fans.getProfile);
// Modify Profile
router.put('/fan/profile/:fan_id', fans.put);
// Get fans dash board information
router.get('/fan/dashboard/:fan_id', fans.getDashBoard);

// register and login user
router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);

module.exports = router;
