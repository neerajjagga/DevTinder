import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
} from '../controllers/auth.controller.js';
import { validateUserSchema } from '../validators/user.validator.js';

const authRouter = express.Router();

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

authRouter.post('/signup', validateUserSchema, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh-token', refreshTokens);


authRouter.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

export default authRouter;
