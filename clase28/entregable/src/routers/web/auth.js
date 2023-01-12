import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'

import config from '../../config.js'

import { Router } from 'express'

import path from 'path'

passport.use(new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
    let userProfile = profile;
    return done(null, userProfile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const authWebRouter = new Router()

authWebRouter.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.get('/auth/facebook', passport.authenticate('facebook'));
authWebRouter.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/',
        failureRedirect: '/faillogin'
    }
));

authWebRouter.get('/faillogin', (req, res) => {
    res.render('/views/pages/login-error.ejs');
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.user?.displayName ?? 'visitante'
    req.logout()
    res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
})

export default authWebRouter