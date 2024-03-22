const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add a new screening
router.post('/', (request, response) => {
    const { movieId, theaterNumber, screeningStart, seatsAvailable } = request.body;

    if (!movieId || !theaterNumber || !screeningStart || seatsAvailable == null) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO screenings (movie_id, theater_number, screening_start, seats_available) VALUES (?, ?, ?, ?)`;

    db.run(sql, [movieId, theaterNumber, screeningStart, seatsAvailable], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Screening added successfully', screeningId: this.lastID });
    });
});

// get all screenings for a movie
router.get('/movie/:movieId', (request, response) => {
    const { movieId } = request.params;

    const sql = `SELECT * FROM screenings WHERE movie_id = ?`;

    db.all(sql, [movieId], (err, screenings) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(screenings);
    });
});

// update screening details
router.put('/:screeningId', (request, response) => {
    const { screeningId } = request.params;
    const { theaterNumber, screeningStart, seatsAvailable } = request.body;
    const sql = `UPDATE screenings SET theater_number = ?, screening_start = ?, seats_available = ? WHERE screening_id = ?`;

    db.run(sql, [theaterNumber, screeningStart, seatsAvailable, screeningId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Screening updated successfully', changes: this.changes });
    });
});

// delete a screening
router.delete('/:screeningId', (request, response) => {
    const { screeningId } = request.params;

    const sql = 'DELETE FROM screenings WHERE screening_id = ?';

    db.run(sql, [screeningId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Screening deleted successfully', changes: this.changes });
    });
});

module.exports = router;
