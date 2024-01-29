const express = require('express');
const router = express.Router();


//login
const bcrypt = require('bcrypt')
const passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login/index')
})

router.post('/', forwardAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: false
    })(req, res, next);
})

module.exports = router