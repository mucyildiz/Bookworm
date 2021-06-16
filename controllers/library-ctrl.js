const mongoose = require('mongoose');
const User = mongoose.model('users');

const addBook = async (req, res) => {
  const bookInfo = req.body.bookInfo;
  const user = await User.findById(req.user._id).exec();
  user.library.push(bookInfo);
  user.save();
};

module.exports = {
  addBook,
}