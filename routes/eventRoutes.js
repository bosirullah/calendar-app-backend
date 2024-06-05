const express = require("express");
const router = express.Router();
const {
    // getEvents,
    events,
    createEvent,
    getEvents,
    // updateEvent,
    // deleteEvent,
} = require("../controllers/eventController");

// router.get("/:userId", getEvents);
router.get("/", events);
router.post("/create-event", createEvent);
router.get("/getEvents", getEvents);
// router.put("/:id", updateEvent);
// router.delete("/:id", deleteEvent);

module.exports = router;
