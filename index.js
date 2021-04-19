const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google').Strategy
const keys = require('./config/keys')


const app = express();

// clientId: 614974199632-a48ecgoqlarva9vv8hg3f3ferqoipuvh.apps.googleusercontent.com
// secret key: zu1z5vg8LQ0K2gg7t0hH_WKl
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken) => {
    console.log(accessToken);
  })
);


const PORT = process.env.PORT || 5000;
app.listen(PORT);