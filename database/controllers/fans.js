var models = require('../models');

module.exports = {
  get: function(req, res) {
    models.fans.get(req.params.fanId, function(err, result) {
      if (err) {
        res.status(500);
        console.log('GET Fan Info error: ', err);
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      }
    })
  },
  saveEvent: function(req, res) {
    models.fans.saveEvent(req.body, function(err, result) {
      if (err) {
        res.status(500);
        console.log('Save Event Fan error: ', err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(201);
      }
    })
  },
  followArtist: function(req, res) {
    models.fans.followArtist(req.body, function(err, result) {
      if (err) {
        res.status(500);
        console.log('Follow Artist Fan error: ', err);
        res.end(JSON.stringfiy(err));
      } else {
        res.sendStatus(201);
      }
    })
  },
  put: function(req, res) {
    models.fans.put(req.body, function(err, result) {
      if (err) {
        res.status(500);
        console.log('Update profile Fan error: ', err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(204);
      }
    })
  },
  removeEvent: function(req, res) {
    models.fans.removeEvent(req.params.eventId, req.params.fanId, function(err, result) {
      if (err) {
        res.status(500);
        console.log('Remove event Fan error: ', err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(201);
      }
    })
  },
  unfollowArtist: function(req, res) {
    models.fans.removeEvent(req.params.eventId, req.params.fanId, function(err, result) {
      if (err) {
        res.status(500);
        console.log('Unfollow artist Fan error: ', err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(201);
      }
    })
  }
}