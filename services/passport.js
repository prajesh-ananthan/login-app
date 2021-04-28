const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users') // collection name

// To be used in cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
})

// To be used in cookies
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Save to mongo model
    // Find user record from users collection
    // Existing user is the model instance of the user found
    User.findOne({googleId: profile.id})
      .then(existingUser => {
        if (existingUser) {
          console.log("User exist in the database");
          // the null means that there is no error here
          // We have a record with the given profile id
          done(null, existingUser);
        } else {
          // If we don't have a record, Create a new record
          new User({googleId: profile.id})
            .save()
            .then(user => done(null, user));
        }
      })
  })
);