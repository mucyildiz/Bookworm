module.exports = app => {

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/getuser', (req, res) => {
    res.json(req.user);
  });

}