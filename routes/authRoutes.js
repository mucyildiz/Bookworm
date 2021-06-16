const passport = require('passport');

module.exports = app => {

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/',
        failureRedirect: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:3000/"
    }),
  );
}