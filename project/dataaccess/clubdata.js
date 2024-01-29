let database = require('../config/db');

function getAllClubs(callback) {
    let sql = 'SELECT * FROM clubs';
    database.query(sql, callback);
}

function addNewClub(name, description, callback) {
    let sql = 'INSERT INTO clubs(name, description) VALUES(?, ?)';
    database.query(sql, [name, description], callback);
}

function getClubByName(clubName, callback) {
    let sql = 'SELECT * FROM clubs WHERE name = ?';
    database.query(sql, [clubName], (err, results) => {
        callback(err, results ? results[0] : null);
    });
}

function getAllClubMemberships(clubName, callback) {
    let sql = 'SELECT * FROM clubmemberships WHERE club = ?';
    database.query(sql, [clubName], callback);
}

module.exports = {
    getAllClubs,
    addNewClub,
    getClubByName,
    getAllClubMemberships
};