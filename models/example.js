// Server-side route (Express/Node.js)
const express = require('express');
const router = express.Router();
const Calendar = require('../models/calendarModel'); // Your Calendar model

// Socket.io should be initialized in your main server file and passed here
module.exports = function(io) {
    // Update calendar route
    router.put('/update-calendar/:id', async (req, res) => {
        const calendarId = req.params.id;
        const updateData = req.body;

        try {
            const updatedCalendar = await Calendar.findByIdAndUpdate(
                calendarId,
                updateData,
                { new: true }
            );

            // Emit the notification event after successful update
            io.emit('calendarUpdated', { message: 'The calendar has been updated!' });

            res.status(200).json(updatedCalendar);
        } catch (error) {
            res.status(500).json({ error: 'Error updating calendar.' });
        }
    });

    return router;
};