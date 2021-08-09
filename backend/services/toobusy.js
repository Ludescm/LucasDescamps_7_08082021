
/*MIDDLEWARE CONTRER LE DENIAL OF SERVICE */

const toobusy = require("toobusy-js");

module.exports = (req, res, next) => {
    if (toobusy()) {
        res.send(503, "Le serveur est saturé !");
    } else {
        next();
    }
};