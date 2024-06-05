const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    participants: [String],
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    sessionNotes: String,
    googleEventId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", eventSchema);
