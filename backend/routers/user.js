/*LOGIQUE ROUTE POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");


//Requête POST pour inscription d'un nouveau user
router.post("/signup", userCtrl.validate("signup"), userCtrl.signup); 
 
//Requête POST pour connexion d'un user existant
router.post("/login", userCtrl.validate("login"), userCtrl.login);

//Requête GET pour afficher les données d'un user
router.get("/:id", userCtrl.getOneUser);

//Requête DELETE pour suppression de compte d'un user existant
router.delete("/:id", userCtrl.deleteAccount);

module.exports = router;