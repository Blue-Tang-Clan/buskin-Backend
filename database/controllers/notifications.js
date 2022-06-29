const notifications = require('../models/notifications');

module.exports = {
  sendEventNotification: (req, res) => {
    notifications.sendEventNotification(req, res);
  },
  sendEventAlert: (req, res) => {
    notifications.sendEventAlert(req, res);
  },
};
