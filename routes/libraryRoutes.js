const LibraryCtrl = require('../controllers/library-ctrl');

module.exports = app => {
  app.put('/api/addbook', LibraryCtrl.addBook)
}