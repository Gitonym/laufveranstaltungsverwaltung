const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureAdmin } = require('../config/auth');
let eventService = require('../services/eventservice');
let userService = require('../services/userservice');


router.get('/', (req, res) => {
    eventService.getAllEvents((err, events) => {
        if (err) {
            res.render('events/index', {events: []});
        } else {
            res.render('events/index', {events: events});
        }
    })
})

router.get('/new', ensureAdmin, (req, res) => {
    res.render('events/new');
})

router.post('/new', ensureAdmin, async (req, res) => {
    try {
        await eventService.addNewEvent(
            req.body.name, 
            req.body.distance, 
            req.body.fee, 
            req.body.startdescription, 
            req.body.startlatitude, 
            req.body.startlongitude, 
            req.body.starttime,
            req.body.startdate
        )
        res.redirect(`/events/${req.body.name}`);

    } catch (err) {
        console.error(err);
        res.redirect('/events/new');
    }
})

router.get('/:eventname', (req, res) => {
    eventService.getEventByName(req.params.eventname, (err, event) => {
        if (err || !event) {
            // error thrown
            res.redirect('/events');
        } else {
            // event found
            // if logged in
            if (req.user) {
                //check if user is registered for this event
                userService.isUserRegisteredToEvent(req.user.username, req.params.eventname, (err, response) => {
                    if (response) {
                        //registered
                        userService.getStartingNumberForUserAndEvent(req.user.username, req.params.eventname, (err, response2) => {
                            console.log("startingnumber: ", response.startNumber, " registered: ", true)
                            //get eventregistration
                            userService.getEventRegistration(req.user.username, req.params.eventname, (err, response3) => {
                                res.render('events/event', { event: event, registered: true, startNumber: response2.startNumber, eventRegistration: response3 });
                            })
                        })
                    } else {
                        res.render('events/event', { event: event, registered: false, startingNumber: null, eventRegistration: null });
                    }
                })
            } else {
                res.render('events/event', { event: event, registered: false, startingNumber: null, eventRegistration: null });
            }
        }
    });
})

router.post('/:eventname/pay', ensureAuthenticated, async (req, res) => {
    try {
        const paymentResponse = await paymentapi.processPayment();
        console.log("payres: ", paymentResponse.data.message);
        console.log("value: ", paymentResponse.data.message == 'Payment successful')

        if (paymentResponse.data.message == 'Payment successfull') {
            userService.markRegistrationPaid(req.user.username, req.params.eventname, err => {
                // handle errors
            });
        }
        res.redirect(`/events/${req.params.eventname}`);
    } catch (error) {
        // Handle errors that occur during the payment process
        console.error(error);
        res.status(500).send("Error processing payment");
    }
});


router.post('/:eventname/register', ensureAuthenticated, (req, res) => {
    eventService.registerForEvent(req.params.eventname, req.user.username, (err, result) => {
        if (err) {
            res.redirect(`/events/${req.params.eventname}`);
        } else if (result.alreadyRegistered) {
            res.redirect(`/events/${req.params.eventname}`);
        } else {
            res.redirect(`/profile/${req.user.username}`);
        }
    });
});


router.post('/:eventname/deregister', ensureAuthenticated, (req, res) => {
    eventService.deregisterFromEvent(req.params.eventname, req.user.username, (err, result) => {
        if (err) {
            res.redirect(`/events/${req.params.eventname}`);
        } else if (result.notRegistered) {
            res.redirect(`/events/${req.params.eventname}`);
        } else {
            res.redirect(`/profile/${req.user.username}`);
        }
    });
});

router.get('/:eventname/participants', (req, res) => {
    eventService.getEventParticipants(req.params.eventname, (err, participants) => {
        if (err) {
            res.redirect(`/events/${req.params.eventname}`);
        } else {
            res.render('events/participants', {event: req.params.eventname, participants: participants, timingdata: null })
        }
    })
})

router.get('/:eventname/certificate', ensureAuthenticated, (req, res) => {
    userService.getEventRegistration(req.user.username, req.params.eventname, (err, eventRegistration) => {
        console.log(eventRegistration)
        res.render('events/certificate', {eventRegistration: eventRegistration})
    })
})

router.post('/:event/:user/disqualify', (req, res) => {
    userService.removeUserFromEvent(req.params.user, req.params.event, err => {
        res.redirect(`/events/${req.params.event}/participants`)
    })
})

module.exports = router;