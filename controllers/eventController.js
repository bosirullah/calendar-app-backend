const Event = require("../models/Event");
const { google } = require("googleapis");
const { oauth2Client } = require("./authController");

exports.getHomePage = async (req, res) => {
    res.send("hiii");
};

// Get all events for a user
// const getEvents = async (req, res) => {
//     try {
//         const events = await Event.find({ userId: req.params.userId });
//         res.status(200).jsx`on(events);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const events = async (req, res) => {
    // res.send("/");
};

// This function will be used to fetch events from the Google Calendar API
const getEvents = async (req, res) => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
        });
        const events = response.data.items.map((event) => ({
            id: event.id,
            title: event.summary,
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
        }));
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// Create a new event
const createEvent = async (req, res, next) => {
    const {
        eventTitle,
        description,
        participants,
        date,
        time,
        duration,
        sessionNotes,
        refreshToken,
    } = req.body;

    // console.log("ref-token = ", refreshToken);

    const event = {
        summary: eventTitle,
        // location: "123 Main St, Anytown, USA",
        description: description,
        // sessionNotes: sessionNotes,
        extendedProperties: {
            private: {
                sessionNotes: sessionNotes,
            },
        },
        start: {
            dateTime: "2024-10-18T09:00:00-09:00",
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: "2024-10-18T12:00:00-12:00",
            timeZone: "America/Los_Angeles",
        },
    };

    try {
        oauth2Client.credentials = {
            refresh_token: refreshToken,
        };

        const calendar = google.calendar("v3");
        const response = calendar.events.insert({
            auth: oauth2Client,
            calendarId: "primary",
            resource: event,
        });

        res.status(201).json({
            message: "Event created successfully",
            // link: response.data.htmlLink,
        });
    } catch (error) {
        console.log("Error creating event:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update an existing event
// const updateEvent = async (req, res) => {
//     const { id } = req.params;
//     const {
// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Event.find({ userId: req.params.userId });
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Update an existing event
// exports.updateEvent = async (req, res) => {
//   const { id } = req.params;
//   const {
//     title,
//     description,
//     participants,
//     date,
//     time,
//     duration,
//     sessionNotes,
//   } = req.body;
//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(
//       id,
//       {
//         title,
//         description,
//         participants,
//         date,
//         time,
//         duration,
//         sessionNotes,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete an event
// const deleteEvent = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Event.findByIdAndDelete(id);
//         res.status(204).json({ message: "Event deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// exports.deleteEvent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Event.findByIdAndDelete(id);
//     res.status(204).json({ message: "Event deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { events, createEvent, getEvents };
