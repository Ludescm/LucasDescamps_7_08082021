// get the client
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const dbconnexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// For pool initialization, see above
/*pool.query("SELECT field FROM atable", function(err, rows, fields) {
    // Connection is automatically released when query resolves
 });*/

 console.log('Connexion réussie à la Database');
// console.log(pool);

module.exports = dbconnexion;