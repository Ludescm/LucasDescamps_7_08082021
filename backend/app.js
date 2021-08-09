const express = require("express");
const bodyParser = require("body-parser");
const articleRoutes = require("./routers/article");
const userRoutes = require("./routers/user");
const commentRoutes = require("./routers/comment");
const thumbRoutes = require("./routers/thumb");
const path = require("path");
const cors = require("./services/cors");

/* Plugins de sécurité */
//Package helmet (13 middleware pour sécuriser les données et les connexions)
//const helmet = require("helmet");                     
//Package hpp (to protect your system from HTTP parameter pollution attacks)
//const hpp = require("hpp");
//Middleware express-rate-limit pour limiter le nombre de requêtes et de tentatives de connexion
const rateLimit = require("./services/limiter");
const reqLimiter = require("./services/limiter");
//Middleware toobusy.js pour empêcher le Denial of Service (DoS) en monitorant le event loop
//const toobusy = require("./services/toobusy");
//Middleware session.js pour sécuriser les cookies de session
//const session = require("./services/session");
/* Fin sécurité */

var connection = require("./connectiondb");

const app = express();

app.use(cors);
//app.use(helmet());
//app.use(hpp());
app.use("/auth", rateLimit.authLimiter);
app.use("/articles", rateLimit.reqLimiter);
//app.use(toobusy);
//app.use(session);
app.use(bodyParser.json());

//Définit les route des quatre routeurs "Article"/"User"/"Comment"/"Thumb"
app.use("/articles", articleRoutes);
app.use("/auth", userRoutes);
app.use('/articles/:slug/comments', commentRoutes);
app.use('/articles/:slug/', thumbRoutes);

module.exports = app;