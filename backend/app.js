// Centre de lAPI  

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const auth = require("./middleware/auth");
const app = express();
require('dotenv').config();


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const mysql2 = require("mysql2");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//dataBase.sequelize.sync();   // Synchronisation de la base de données grâce à Sequelize



app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentRoutes);


module.exports = app