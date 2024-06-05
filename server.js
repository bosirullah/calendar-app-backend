const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const router = require("./routes/auth");
const path = require("path");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

// app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
