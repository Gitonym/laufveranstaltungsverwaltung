let database = require('../config/db');

function getUserByUsername(username, callback) {
    let sql = 'SELECT * FROM users WHERE username = ?';
    database.query(sql, [username], (err, results) => {
        callback(err, results ? results[0] : null);
    });
}

function getUserEventRegistrations(username, callback) {
    let sql = 'SELECT * FROM eventregistrations WHERE user = ?';
    database.query(sql, [username], (err, results) => {
        callback(err, results);
    });
}

function getUserClubMemberships(username, callback) {
    let sql = 'SELECT * FROM clubmemberships WHERE user = ?';
    database.query(sql, [username], (err, results) => {
        callback(err, results);
    });
}

async function addNewUser(userName, hashedPassword, firstName, lastName, date, email, mobile, gender, address, isAdmin) {
    let sql = `INSERT INTO users (username, hashedpassword, firstname, lastname, birthday, email, mobile, gender, address, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [userName, hashedPassword, firstName, lastName, date, email, mobile, gender, address, isAdmin];
    await database.query(sql, values);
}

function isUserRegisteredToEvent(userName, eventName, callback) {
    let sql = 'SELECT * FROM eventregistrations where user=? and event=?';
    database.query(sql, [userName, eventName], (err, results) => {
        if (results[0]) {
            callback(err, true)
        } else {
            callback(err, false)
        }
    });
}

function getStartingNumberForUserAndEvent(userName, eventName, callback) {
    let sql = 'SELECT startNumber FROM eventregistrations where user=? and event=?';
    database.query(sql, [userName, eventName], (err, results) => {
        callback(err, results[0])
    });
}

function removeUserFromEvent(userName, eventName, callback) {
    let sql = 'DELETE FROM eventregistrations WHERE user=? and event=?;';
    database.query(sql, [userName, eventName], (err, results) => {
        callback(err)
    });
}

function getEventRegistration(userName, eventName, callback) {
    let sql = 'SELECT * FROM eventregistrations WHERE user=? and event=?;';
    database.query(sql, [userName, eventName], (err, results) => {
        callback(err, results[0])
    });
}

function markRegistrationPaid(userName, eventName, callback) {
    let sql = 'UPDATE eventregistrations SET paid = true WHERE user=? AND event=?;';
    database.query(sql, [userName, eventName], (err) => {
        callback(err)
    });
}

module.exports = {
    getUserByUsername,
    getUserEventRegistrations,
    getUserClubMemberships,
    addNewUser,
    isUserRegisteredToEvent,
    getStartingNumberForUserAndEvent,
    removeUserFromEvent,
    getEventRegistration,
    markRegistrationPaid
};