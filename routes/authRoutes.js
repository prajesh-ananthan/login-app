const passport = require('passport')

module.exports = (app) => {

  /**
   * Request Google to give user profile and email information
   */
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};