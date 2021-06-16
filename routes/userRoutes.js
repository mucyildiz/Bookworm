const mongoose = require('mongoose');
const User = mongoose.model('users');
const axios = require('axios');

module.exports = app => {

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  

  app.get('/api/getuser', (req, res) => {
    res.json(req.user);
  });
  
  // FOR MONGODB QUERY: const user = await User.findById(userID).exec();


}