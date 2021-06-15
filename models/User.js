const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  firstName: String,
  library: Array
});

mongoose.model('users', userSchema);