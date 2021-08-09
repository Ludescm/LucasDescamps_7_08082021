var mysql = require('mysql');
var dotenv = require('dotenv').config({path: './.env'});

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: 'groupomania'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connecté à la base de donnée groupomania ' + DB_USER );
});

module.exports = db;