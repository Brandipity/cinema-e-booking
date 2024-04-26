const express = require('express');
const router = express.Router();
const db = require('../db/database');

// endpoint to add a movie

router.post('/', async (request, response) => {
    try {
        const { tmdbId, title, description, releaseDate } = request.body;
        if (!title || !description || !releaseDate || !tmdbId) {
            return response.status(400).json({ error: 'Missing required fields' });
        }
        const sql = `INSERT INTO movies (tmdbId, title, description, release_date) VALUES (?, ?, ?, ?)`;
        const dbResponse = await db.run(sql, [tmdbId, title, description, releaseDate]); // Use tmdbId here (or else lol)
        response.json({ message: 'Movie added successfully', movieId: dbResponse.lastID });
    } catch (err) {
        console.error(err.message);
        response.status(500).json({ error: err.message });
    }
});


// endpoint to delete a movie

router.delete('/', async (request, response) => {
    try {
        const { movieId } = request.query;  // Notice using query here
        console.log('Deleting movie with ID:', movieId);
        const sql = `DELETE FROM movies WHERE movie_id = ?`;
        await db.run(sql, [movieId]);
        response.json({ message: 'Movie deleted successfully' });
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

// fetch upcoming movies
// fully doesn;t wrk but the idea is there...
router.get('/upcoming', (request, response) => {
    const sql = `SELECT * FROM movies WHERE release_date > '2024-04-30'`;
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
