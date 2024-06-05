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

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

// --------------------- Deployment --------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "/frontend/src/app")));

//     app.get("*", (req, res) =>
//         res.sendFile(
//             path.resolve(__dirname1, "frontend", "src", "app", "page.tsx")
//         )
//     );
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running..");
//     });
// }

// app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
