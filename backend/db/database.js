
// database connection module
//imports the sqlite3
const sqlite3 = require('sqlite3').verbose();

// resolve the path to the SQLite database file
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/cinema.db');

//creates a new SQLite database object using the path to the database file obtained in the previous step
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        throw err; // we should probably handle this more gracefully
    }
    console.log('Connected to the SQLite database.');
});

//Export the database object
module.exports = db;

