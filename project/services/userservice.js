let userData = require('../dataaccess/userdata');
const bcrypt = require('bcrypt');

function getUserDetails(username, callback) {
    userData.getUserByUsername(username, (err, user) => {
        if (err || !user) {
            return callback(err, null);
        }
        userData.getUserEventRegistrations(username, (err, eventRegistrations) => {
            if (err) {
                return callback(err, null);
            }
            userData.getUserClubMemberships(username, (err, clubMemberships) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, { profile: user, eventregistrations: eventRegistrations, clubmemberships: clubMemberships });
            });
        });
    });
}

async function registerUser(userName, password, firstName, lastName, date, email, mobile, gender, address, isAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userData.addNewUser(
        userName,
        hashedPassword,
        firstName,
        lastName,
        date,
        email,
        mobile,
        gender,
        address,
        isAdmin
    );
}

function getStartingNumberForUserAndEvent(userName, eventName, callback) {
    userData.getStartingNumberForUserAndEvent(userName, eventName, callback);
}

function isUserRegisteredToEvent(userName, eventName, callback) {
    userData.isUserRegisteredToEvent(userName, eventName, callback);
}

function removeUserFromEvent(userName, eventName, callback) {
    userData.removeUserFromEvent(userName, eventName, callback);
}

function getEventRegistration(userName, eventName, callback) {
    userData.getEventRegistration(userName, eventName, callback);
}

function markRegistrationPaid(userName, eventName, callback) {
    userData.markRegistrationPaid(userName, eventName, callback);
}

module.exports = {
    getUserDetails,
    registerUser,
    getStartingNumberForUserAndEvent,
    isUserRegisteredToEvent,
    removeUserFromEvent,
    getEventRegistration,
    markRegistrationPaid
};