const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify');
const app = express();

passport.use(
  new SpotifyStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {}
  )
);
