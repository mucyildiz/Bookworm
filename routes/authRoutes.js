const passport = require('passport');

module.exports = app => {
  let userInfo = {};

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );

  app.get('/auth/google/callback', (req, res) => {
  passport.authenticate('google', (err, user) => {
    userInfo = {
      firstName: user.firstName,
      _id: user._id
    };
    return res.redirect(process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/');
  })(req, res);
  });

  app.get('/api/getuser', (req, res) => {res.json(userInfo)});
}