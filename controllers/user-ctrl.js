const mongoose = require('mongoose');
const User = mongoose.model('users');

const addBook = async (req, res) => {
  const bookTitle = req.body.title;
  const user = await User.findById(req.user._id).exec();
  user.library.push(bookTitle);
  user.save();
};

module.exports = {
  addBook,
}