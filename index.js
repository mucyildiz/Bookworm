const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

const mongoURI = keys.mongoURI;
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

require('./routes/authRoutes')(app);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));