const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
);

const apiStatus = async (req, res, next) => {
    res.send({ message: "ok api is working" });
};

const createTokens = async (req, res, next) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.credentials = tokens.refresh_token;
        res.send(tokens);
    } catch (error) {
        next(error);
    }
};

module.exports = { apiStatus, createTokens, oauth2Client };
