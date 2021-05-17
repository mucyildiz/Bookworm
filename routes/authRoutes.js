const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    }), 
    (req, res) => {
      res.send('hi');
    }
  );
}