
const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");


//Requête POST pour poster un nouvel article sur le réseau social
router.post("/add", auth, articleCtrl.validate("createArticle"), articleCtrl.createArticle); 

//Requête PUT pour modifier un article déjà posté
router.put("/:slug", auth, articleCtrl.validate("modifyArticle"), articleCtrl.modifyArticle); 

//Requête DELETE pour supprimer un article qu'on a posté
router.delete("/:slug", auth, articleCtrl.deleteArticle); 

//Requête GET pour afficher tous les articles postés
router.get("/", auth, articleCtrl.getAllArticles); 

//Requête GET pour afficher un article en particulier
router.get("/:slug", auth, articleCtrl.getOneArticle); 

module.exports = router;
