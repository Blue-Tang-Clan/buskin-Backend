const router = require('express').Router();
const auth = require('../database/controllers/auth');
const artist = require('../database/controllers/artists');
const fans = require('../database/controllers/fans');
const events = require('../database/controllers/events');
<<<<<<< HEAD
const notifications = require('../database/controllers/notifications');
=======
const search = require('../database/controllers/search');
const homePage = require('../database/controllers/homepage');

// Routes for HomePage
router.get('/homepage/:latitude/:longitude', homePage.getHomePageInfo);

router.get('/homepage/genre', homePage.getHomePageGenre);

router.get('/homepage/:genre', homePage.searchHomePageGenre);

router.get('/homepage/defaultGenre', homePage.geteDefaultGenre);

// Routes for Search
router.get('/search', search.getSearchInfo);
>>>>>>> development

// Routes for Artists
router.get('/artist/details/:artist_id', artist.getArtistDetails);

router.put('/artist/profile/:artist_id', artist.updateArtistProfile);

router.post('/artist/event/:artist_id', artist.postArtistEvent);

router.put('/artists/event/:artist_id', artist.putArtistEvent);

router.delete('/artists/event/:artist_id', artist.deleteArtistEvent);

// Routes for Fans
router.get('/fan/dashboard/:fanId', fans.get);

router.post('/fans/event', fans.saveEvent);

router.post('/fans/follow', fans.followArtist);

router.put('/fan/profile/:fanId', fans.put);

router.delete('/fans/event/:fanId/:eventId', fans.removeEvent);

router.delete('/fans/follow/:fanId/:artistId', fans.unfollowArtist);

router.get('/events/:date', events.getAll);
router.get('/event/:eventId', events.get);
router.get('/check/events', events.checkEventConflict);

// register and login user
router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);

// new event notification :for fans
router.post('/eventnotification', notifications.sendEventNotification);

// event collision alert
// router.get()

module.exports = router;
