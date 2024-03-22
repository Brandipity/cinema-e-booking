const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add a new theater
router.post('/', (request, response) => {
    const { theaterNumber, capacity, description } = request.body;

    if (!theaterNumber || !capacity) {
        return response.status(400).json({ error: 'Missing required fields: theaterNumber and capacity are required' });
    }

    const sql = `INSERT INTO theaters (theater_number, capacity, description) VALUES (?, ?, ?)`;

    db.run(sql, [theaterNumber, capacity, description || ''], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Theater added successfully', theaterId: this.lastID });
    });
});

// get all theaters
router.get('/', (request, response) => {
    const sql = `SELECT * FROM theaters`;

    db.all(sql, [], (err, theaters) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(theaters);
    });
});

// update a theater's details
router.put('/:theaterId', (request, response) => {
    const { theaterId } = request.params;
    const { capacity, description } = request.body;

    const sql = `UPDATE theaters SET capacity = ?, description = ? WHERE theater_id = ?`;

    db.run(sql, [capacity, description, theaterId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Theater updated successfully', changes: this.changes });
    });
});

// delete a theater
router.delete('/:theaterId', (request, response) => {
    const { theaterId } = request.params;

    const sql = 'DELETE FROM theaters WHERE theater_id = ?';

    db.run(sql, [theaterId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Theater deleted successfully', changes: this.changes });
    });
});

module.exports = router;
