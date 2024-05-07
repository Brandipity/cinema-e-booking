const express = require('express');
const router = express.Router();
const db = require('../db/database');

// creating a booking

router.post('/', (request, response) => {
    const { userId, screeningId, numSeats, bookingTime, seat } = request.body;

    if (!userId || !screeningId || !numSeats || !seat) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    // fallback to current time if booking time is absent
    const time = bookingTime || new Date().toISOString();

    const sql = `INSERT INTO bookings (user_id, screening_id, num_seats, booking_time, seat) VALUES (?, ?, ?, ?, ?)`;

    // added more graceful error handling
    db.run(sql, [userId, screeningId, numSeats, time, seat], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Booking added successfully', bookingId: this.lastID });
    });
});

// updating a booking

router.put('/:bookingId', (request, response) => {
    const { bookingId } = request.params;
    const { numSeats, bookingTime } = request.body;

    if (!numSeats && !bookingTime) {
        return response.status(400).json({ error: 'No update fields provided' });
    }

    let sql = 'UPDATE bookings SET ';
    const params = [];

    if (numSeats) {
        sql += 'num_seats = ?';
        params.push(numSeats);
    }

    if (bookingTime) {
        if (params.length > 0) sql += ', ';
        sql += 'booking_time = ?';
        params.push(bookingTime);
    }

    sql += ' WHERE booking_id = ?';
    params.push(bookingId);

    db.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Booking updated successfully', changes: this.changes });
    });
});

// deleting a booking

router.delete('/:bookingId', (request, response) => {
    const { bookingId } = request.params;

    const sql = 'DELETE FROM bookings WHERE booking_id = ?';

    db.run(sql, bookingId, function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Booking deleted successfully', changes: this.changes });
    });
});


module.exports = router;
