const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/usersCtrl");
const auth = require('../middleware/auth');

router.get("/all/", userCtrl.findAll);

router.get("/:id", userCtrl.findOne);

router.delete("/", userCtrl.deleteOne);

router.delete("/:id",userCtrl.deleteMyAccount);

module.exports = router;
