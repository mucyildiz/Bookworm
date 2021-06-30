const { json } = require('express');
const mongoose = require('mongoose');
const LibraryCtrl = require('../controllers/library-ctrl');
const User = mongoose.model('users');

module.exports = app => {
  app.put('/api/addbook', LibraryCtrl.addBook)

  app.put('/api/removebook', LibraryCtrl.removeBook)

  app.get('/api/getlibrary', async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    const library = user.library;
    res.json(library);
  })
}