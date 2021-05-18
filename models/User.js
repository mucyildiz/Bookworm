const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  firstName: String
});

mongoose.model('users', userSchema);