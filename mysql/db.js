const mysql = require('mysql2');
const config = require('../config');

const db = mysql.createConnection(config.DB).promise();

db.connect((err) => {
    if(err)
        console.error('Cannot connect to sephory database');
    else console.log('Connected to sephory');
});

module.exports = db;