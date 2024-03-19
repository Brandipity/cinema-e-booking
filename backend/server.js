
// server.js
// Contains endpoints to interact with the database securely

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize the SQLite database
// Make sure the Express server is running

const db = new sqlite3.Database('./backend/cinema.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// add-a-movie endpoint
app.post('/api/movies', (request, response) => {
    const { id, title, description, releaseDate } = request.body;
    const sql = `INSERT INTO movies (tmdbId, title, description, release_date) VALUES (?, ?, ?, ?)`;

    db.run(sql, [id, title, description, releaseDate], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Movie added successfully', movieId: this.lastID });
    });
});

// returns an array with all the movies in the database, kinda disgusting but whatever (should add a 'Now Playing' attribute later)

app.get('/api/movies/now-playing', (request, response) => {
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

// anything goes, except port 3000

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
