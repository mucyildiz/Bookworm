const keys = require('../config/keys');

module.exports = app => {

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/getuser', (req, res) => {
    res.json(req.user);
  });

  app.get('/api/getGoogleAPIKey', (req, res) => {
    res.send(keys.googleAPIKey);
  })

}