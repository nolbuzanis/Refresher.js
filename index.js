const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        console.log(profile);

        if (!profile) {
          done(null, false);
        }
        done(null, profile);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

app.get('/auth/spotify', passport.authenticate('spotify', { session: false }));
app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

app.get('/', (req, res) => {
  res.send("<a href='/auth/spotify' >Log In With Spotify</a>");
});

app.listen('8000');
