const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
let userService = require('../services/userservice');

router.get('/', ensureAuthenticated, (req, res) => {
    let username = req.user.username;
    res.redirect(`/profile/${username}`);
})

router.get('/:username', ensureAuthenticated, (req, res) => {
    userService.getUserDetails(req.params.username, (err, userDetails) => {
        if (err) {
            res.redirect('/');
        } else if (!userDetails) {
            res.redirect('/');
        } else {
            res.render('profile/index', userDetails);
        }
    });
});

module.exports = router