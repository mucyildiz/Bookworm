const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

const mongoURI = keys.mongoURI;
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));