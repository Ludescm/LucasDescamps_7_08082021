  
/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES COMMENTAIRES POSTES */

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

//Requête POST pour poster un nouveau commentaire sur un article
router.post("/", auth, commentCtrl.validate("createComment"), commentCtrl.createComment); 

//Requête PUT pour modifier un commentaire déjà posté
router.put("/:cryptoslug", auth, commentCtrl.validate("modifyComment"), commentCtrl.modifyComment); 

//Requête DELETE pour supprimer un commentaire qu'on a posté
router.delete("/:cryptoslug", auth, commentCtrl.deleteComment); 

//Requête GET pour afficher tous les commentaires postés sur un article
router.get("/", auth, commentCtrl.getAllComments); 

//Requête GET pour afficher un commentaire en particulier
router.get("/:cryptoslug", auth, commentCtrl.getOneComment); 

module.exports = router;

