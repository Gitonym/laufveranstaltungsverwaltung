const express = require('express');
let database = require('../config/db');
const router = express.Router();


router.get('/api', (req, res) => {
    data = {
        message: "This is an api for accessing timing data for running events."
    }
    res.json(data);
})

//legacy
router.post('/api/get-times', (req, res) => {
    const event = req.body.event;
    const users = req.body.users;
    let times = users.map(user => {
        return {
            user: user.user,
            event: user.event,
            time: Math.floor(Math.random() * 101) // Generate a random time
        };
    });

    res.json({times: times});
})

router.post('/api/submit/:event/:number/split', (req, res) => {
    setSplitTimeByStartNumber(req.params.event, req.params.number);
    res.json({ message: 'Data received successfully', event: req.params.event, number: req.params.number });
});

router.post('/api/submit/:event/:number/end', (req, res) => {
    setEndTimeByStartNumber(req.params.event, req.params.number);
    res.json({ message: 'Data received successfully', event: req.params.event, number: req.params.number });
});

async function setSplitTimeByStartNumber(eventName, startNumber) {
    let sql = 'UPDATE eventregistrations SET splitTime=NOW() WHERE event=? and startNumber=?';
    const values = [eventName, startNumber];
    await database.query(sql, values);
}

async function setEndTimeByStartNumber(eventName, startNumber) {
    let sql = 'UPDATE eventregistrations SET finishTime=NOW() WHERE event=? and startNumber=?';
    const values = [eventName, startNumber];
    await database.query(sql, values);
}

module.exports = router