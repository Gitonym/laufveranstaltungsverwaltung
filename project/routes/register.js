const express = require('express');
const router = express.Router();
let userService = require('../services/userservice');

//login
const bcrypt = require('bcrypt')
const passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('register/index')
})

router.post('/', forwardAuthenticated, async (req, res) => {
    try {
        await userService.registerUser(
            req.body.username,
            req.body.password,
            req.body.firstname,
            req.body.lastname,
            req.body.date,
            req.body.email,
            req.body.mobile,
            "M",
            req.body.address,
            false
        );
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
});

module.exports = router