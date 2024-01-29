let eventdata = require('../dataaccess/eventdata');

function getAllEvents(callback) {
    eventdata.getAllEvents(callback)
}

async function addNewEvent(eventName, distance, fee, startdescription, startlatitude, startlongitude, starttime, startdate) {
    await eventdata.addNewEvent(eventName, distance, fee, startdescription, startlatitude, startlongitude, starttime, startdate);
}

function getEventByName(eventName, callback) {
    eventdata.getEventByName(eventName, callback);
}

function registerForEvent(eventName, userName, callback) {
    eventdata.checkRegistration(eventName, userName, (err, isRegistered) => {
        if (err || isRegistered) {
            return callback(err, { alreadyRegistered: isRegistered });
        }
        eventdata.registerUser(eventName, userName, getRandomStartNumber(), callback);
    });
}

function getRandomStartNumber() {
    min = 0
    max = 100000
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deregisterFromEvent(eventName, username, callback) {
    eventdata.checkRegistration(eventName, username, (err, isRegistered) => {
        if (err || !isRegistered) {
            return callback(err, { notRegistered: !isRegistered });
        }
        eventdata.deregisterUser(eventName, username, callback);
    });
}

function getEventParticipants(eventName, callback) {
    eventdata.getEventParticipants(eventName, callback);
}

module.exports = {
    getAllEvents,
    addNewEvent,
    getEventByName,
    registerForEvent,
    deregisterFromEvent,
    getEventParticipants,
    getRandomStartNumber
}