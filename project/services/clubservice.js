let clubdata = require('../dataaccess/clubdata');

function getAllClubs(callback) {
    clubdata.getAllClubs(callback);
}

function addNewClub(name, description, callback) {
    clubdata.addNewClub(name, description, callback);
}

function getClubDetails(clubName, callback) {
    clubdata.getClubByName(clubName, (err, club) => {
        if (err || !club) {
            //error thrown
            return callback(err);
        }
        //club found
        clubdata.getAllClubMemberships(clubName, (err, clubMemberships) => {
            if (err) {
                //error thrown
                return callback(err);
            }
            //members found
            callback(null, { club: club, clubmemberships: clubMemberships});
        })
    })
}

module.exports = {
    getAllClubs,
    addNewClub,
    getClubDetails
};