let database = require('../config/db');

function getAllEvents(callback) {
    let sql = 'SELECT * FROM events ORDER BY startdate, starttime DESC';
    database.query(sql, callback);
}

async function addNewEvent(eventName, distance, fee, startdescription, startlatitude, startlongitude, starttime, startdate) {
    let sql = 'INSERT INTO events(name, distance, fee, startdescription, startlatitude, startlongitude, starttime, startdate) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        eventName,
        distance,
        fee,
        startdescription,
        startlatitude,
        startlongitude,
        starttime,
        startdate
    ];
    await database.query(sql, values);
}

function getEventByName(eventName, callback) {
    let sql = 'SELECT * FROM events WHERE name = ?';
    database.query(sql, [eventName], (err, event) => {
        callback(err, event ? event[0] : null);
    });
}

function checkRegistration(eventName, username, callback) {
    let sql = 'SELECT * FROM eventregistrations WHERE event=? AND user=?';
    database.query(sql, [eventName, username], (err, results) => {
        callback(err, results && results.length > 0);
    });
}

function registerUser(eventName, userName, startNumber, callback) {
    let sql = 'INSERT INTO eventregistrations(event, user, startNumber) VALUES(?, ?, ?)';
    database.query(sql, [eventName, userName, startNumber], callback);
}

function deregisterUser(eventName, username, callback) {
    let sql = 'DELETE FROM eventregistrations WHERE event=? AND user=?';
    database.query(sql, [eventName, username], callback);
}

function getEventParticipants(eventName, callback) {
    let sql = 'SELECT * FROM eventregistrations where event=?';
    database.query(sql, [eventName], callback);
}

module.exports = {
    getAllEvents,
    addNewEvent,
    getEventByName,
    checkRegistration,
    registerUser,
    deregisterUser,
    getEventParticipants
}