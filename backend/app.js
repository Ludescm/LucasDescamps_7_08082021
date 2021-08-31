// Centre de lAPI  

const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const helmet        = require("helmet");
const path          = require("path");
const auth          = require("./middleware/auth");
const app           = express();


const authRoutes    = require("./routes/auth")
const userRoutes    = require("./routes/user")
const messageRoutes = require("./routes/message")
const commentRoutes = require("./routes/comment")

const mysql2 = require("mysql2");

const { env } = require("process");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//dataBase.sequelize.sync();   // Synchronisation de la base de données grâce à Sequelize

/*const connexion = mysql2.createConnection({
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "root",
    database: env.DB_NAME || "groupomania",
    password: env.DB_PASS || "3021269411905Luc@s",
});
connexion.on("connection", () => {
    console.log("Connection effectuée");
});
connexion.promise().query("select * from users").then(data => {
    //console.log(data);
});*/


app.use("/images",          express.static(path.join(__dirname, "images")));
app.use("/api/auth",        authRoutes);

app.use("/api/users",       auth, userRoutes);
app.use("/api/messages",    auth, messageRoutes);
app.use("/api/comments",    auth, commentRoutes);


module.exports = app