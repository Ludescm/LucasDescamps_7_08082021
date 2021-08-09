/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES LIKES/DISLIKES */

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const thumbCtrl = require("../controllers/thumb.js");


//Requête POST pour envoyer un like ou un dislike sur un article
router.post("/thumbs", auth, thumbCtrl.sendThumb); 

//Requête DELETE pour supprimer le like ou le dislike qu'on a posté
router.delete("/thumbs", auth, thumbCtrl.deleteThumb); 

//Requête GET pour afficher tous les likes et dislikes d'un article
router.get("/thumbs", auth, thumbCtrl.getAllThumbs); 

//Requête GET pour afficher le like ou le dislike d'un user sur un article
router.get("/thumbs/user", auth, thumbCtrl.getUserThumb); 

module.exports = router;