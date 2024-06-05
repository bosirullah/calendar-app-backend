const express = require("express");
const router = express.Router();
const { apiStatus, createTokens } = require("../controllers/authController");
// const { google } = require("googleapis");
// const User = require("../models/User");

router.route("/").get(apiStatus);
router.route("/create-tokens").post(createTokens);

module.exports = router;
