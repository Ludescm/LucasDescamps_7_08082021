/*MIDDLEWARE POUR SECURISER LES COOKIES DE SESSION (contre attaques XSS et CSRF)*/


const expressSession = require("express-session");
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) 

const session = expressSession({
    secret: "GroupoASueur21",
    name: "sessionId",  
    cookie: {secure: true, httpOnly: true, sameSite: true, path: "/", expires: expiryDate}    
});

module.exports = session; 