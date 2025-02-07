import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
} from '../controllers/auth.controller.js';
import { validateUserSchema } from '../validators/user.validator.js';
import User from '../models/user.model.js';

const authRouter = express.Router();

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        console.log(profile);

        if (!email) {
            return done(null, false, { message: 'No email associated with this GitHub account.' });
        }

        const user = await User.findOne({ email: profile.emails[0].value });
        console.log(user);

        if (user) {
            return done(null, user);
        }
        const randomPassword = Math.random().toString(36).slice(-8);

        const newUser = new User({
            name: profile.displayName ? profile.displayName.slice(0, 25) : 'Anonymous',
            password: randomPassword,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
            profileImageUrl: (profile.photos && profile.photos[0]) ? profile.photos[0].value : '',
            about: profile._json.bio ? profile._json.bio.slice(0, 160) : ''
        });
        await newUser.save();
        return done(null, newUser);
    }
));

authRouter.post('/signup', validateUserSchema, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh-token', refreshTokens);

authRouter.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    async function (req, res) {
        await signUpUser(req, res);
        return res.redirect(`http://localhost:5173/api/auth/github/callback?user=${JSON.stringify(req.user)}`);
    }
);

export default authRouter;
