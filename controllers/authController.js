const { google } = require("googleapis");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    CLIENT_URL
);

const createTokens = async (req, res, next) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.credentials = tokens.refresh_token;

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const googleId = payload.sub;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                googleId,
                refreshToken: tokens.refresh_token,
            });
            await user.save();
        } else {
            user.refreshToken = tokens.refresh_token;
            await user.save();
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Store JWT in cookies
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.send({
            message: "Authentication successful",
            jwtToken: jwtToken,
            tokens,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTokens, oauth2Client };
