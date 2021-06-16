const UserCtrl = require('../controllers/library-ctrl');

module.exports = app => {
  app.put('/api/addbook', UserCtrl.addBook)
}