const express = require("express");
const router = express.Router();
const { createTokens } = require("../controllers/authController");

router.route("/create-tokens").post(createTokens);

module.exports = router;
