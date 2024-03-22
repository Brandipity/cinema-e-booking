
// database connection module

const sqlite3 = require('sqlite3').verbose();

// resolve path
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/cinema.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        throw err; // we should probably handle this more gracefully
    }
    console.log('Connected to the SQLite database.');
});

module.exports = db;

