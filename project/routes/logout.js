const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')


router.post('/', ensureAuthenticated, (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/login');
    });
})

module.exports = router