/*MIDDLEWARE LIMITANT LE NOMBRE MAXIMAL DE TENTATIVES D'AUTHENTIFICATION (CONTRE BRUTE FORCE) ET LIMITANT LE NOMBRE MAXIMAL DE REQUETES*/

const rateLimit = require("express-rate-limit");

//Limitation du nombre de tentatives de connexion
const authLimiter = rateLimit({
    windowMs : 60 * 1000, 
    max: 5, 
    message: "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement."
});

//Limitation du nombre maximal de requêtes
const reqLimiter = rateLimit({
    windowMs : 5 * 60 * 1000, 
    max: 300, 
    message: "Vous avez dépassé le nombre maximal de requêtes, merci de réessayer ultérieurement."
});

module.exports = { authLimiter, reqLimiter };