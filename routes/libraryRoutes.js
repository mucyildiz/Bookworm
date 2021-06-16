const UserCtrl = require('../controllers/user-ctrl');

module.exports = app => {
  app.put('/api/addbook', UserCtrl.addBook)
}