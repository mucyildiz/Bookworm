const mongoose = require('mongoose');
const User = mongoose.model('users');

const addBook = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const bookInfo = req.body.bookInfo;
  const id = bookInfo.bookId;

  if(user.library.filter(book => book.bookId === id).length === 0) {
    user.library.push(bookInfo);
    user.save();
  }
};

const removeBook = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const bookInfo = req.body.bookInfo;
  const id = bookInfo.bookId;
  const newLibrary = user.library.filter(book => book.bookId !== id);
  user.library = newLibrary;
  user.save();
}

module.exports = {
  addBook, removeBook
}