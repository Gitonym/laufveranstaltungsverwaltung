const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureAdmin } = require('../config/auth');
let clubservice = require('../services/clubservice');


router.get('/', (req, res) => {
    clubservice.getAllClubs((err, clubs) => {
        if (err) {
            res.render('clubs/index', {clubs: []});
        } else {
            res.render('clubs/index', {clubs: clubs});
        }
    });
})

router.get('/new', ensureAdmin, (req, res) => {
    res.render('clubs/new');
})

router.post('/new', ensureAdmin, (req, res) => {
    clubservice.addNewClub(req.body.name, req.body.description, (err) => {
        if (err) {
            res.redirect('/clubs/new');
        } else {
            res.redirect(`/clubs/${req.body.name}`);
        }
    })
})

router.get('/:clubname', (req, res) => {
    clubservice.getClubDetails(req.params.clubname, (err, clubDetails) => {
        if (err) {
            res.redirect('/clubs');
        } else {
            res.render('clubs/club', clubDetails);
        }
    });
});

module.exports = router;