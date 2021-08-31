
const mysql = require("mysql2/promise");


const dbconnexion = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    database: process.env.DB_NAME || "groupomania",
    password: process.env.DB_PASS || "3021269411905Luc@s",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

dbconnexion.on("connection", () => {
    console.log("connection etablie");
});

dbconnexion.on("error", () => {
    console.log("connexion a la base de donnée echouée");
})

exports.modules = dbconnexion;