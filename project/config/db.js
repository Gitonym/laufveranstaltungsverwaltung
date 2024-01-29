var mysql = require('mysql');
var mysqldb;

function connectDatabase() {
    if (!mysqldb) {
        mysqldb = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'runningEvents'
        });

        mysqldb.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.error('Error connecting database!');
                throw err;
            }
        });
    }
    return mysqldb;
}

module.exports = connectDatabase();