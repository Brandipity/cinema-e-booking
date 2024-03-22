const express = require('express');
const router = express.Router();
const db = require('../db/database');

// endpoint to add a movie
router.post('/', async (request, response) => {
    try {
        const { id, title, description, releaseDate } = request.body;
        // check to make sure all required fields are present
        // prevents things like SQL injection (hopefully)
        if (!title || !description || !releaseDate) {
            return response.status(400).json({ error: 'Missing required fields' });
        }
        const sql = `INSERT INTO movies (tmdbId, title, description, release_date) VALUES (?, ?, ?, ?)`;
        const dbResponse = await db.run(sql, [id, title, description, releaseDate]);
        response.json({ message: 'Movie added successfully', movieId: dbResponse.lastID });
    } catch (err) {
        console.error(err.message);
        response.status(500).json({ error: err.message });
    }
});

// fetch now-playing movies
router.get('/now-playing', (request, response) => {
    const sql = `SELECT * FROM movies`;
    // wrapped in a promise call, API will return null otherwise
    new Promise((resolve, reject) => {
        db.all(sql, [], (err, movies) => {
            if (err) {
                reject(err);
            } else {
                resolve(movies);
            }
        });
    })
        .then(movies => {
            response.json(movies);
        })
        .catch(err => {
            console.error(err.message);
            response.status(500).send("Failed to fetch current movies");
        });
});

module.exports = router;
