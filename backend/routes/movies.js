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


router.get('/find-by-title', async (request, response) => {
    const { title } = request.query;
    if (!title) {
        return response.status(400).json({ error: 'Title parameter is required' });
    }

    const sql = `SELECT * FROM movies WHERE title = ?`;
    try {
        const movie = await new Promise((resolve, reject) => {
            db.get(sql, [title], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (movie) {
            response.json(movie);
        } else {
            response.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).json({ error: err.message });
    }
});


module.exports = router;
