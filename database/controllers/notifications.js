const models = require('../models');

module.exports = {
  sendEventNotification: (req, res) => {
    models.notifications.sendEventNotification(req, res);
  },
  sendEventAlert: (req, res) => {
    models.notifications.sendEventAlert(req, res);
  },
};
