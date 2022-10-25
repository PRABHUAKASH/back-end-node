const express = require("express");
const router = express.Router();
const contentModule = require("../modules/contentModule");
const auth = require("../modules/authModule");

router.get("/get", contentModule.getContent);

router.put("/update/:id",auth.authorizeuser, contentModule.updateContent);

router.post("/create",auth.authorizeuser, contentModule.createContent);

router.delete("/delete/:id",auth.authorizeuser, contentModule.deleteContent);

module.exports = router;