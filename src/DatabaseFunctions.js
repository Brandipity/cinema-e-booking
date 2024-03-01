/* Contains all the database methods. Will be split into groups of two. First half of the file
contains the 'user' functions, while the latter half consists of 'admin' functions.
 */

// DatabaseOperations.js

import mysql from 'mysql2/promise';

class DatabaseOperations {

    /*IMPORTANT: This (admittedly shitty hardcoded) connection
    assumes you have a MySQL server running locally. This sucks, but
    my server only allows incoming connections from local addresses.
     */

    constructor(databaseInstance) {
        this.connection = mysql.createPool({
            host: 'host: localhost', port: 3306,
            user: 'abcs',
            password: 'SectionA!',
            database: 'cinema_e_booking',
            waitForConnections: true,
            //conservative limit, may need to up this later
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    // Accepts a struct containing movie details
    // struct should at LEAST contain the title, description, and release date
    // struct will change most likely, decent holdover tho
    // Should probably come up with a good ID schema
    async addMovie(movieDetails) {
        const {title, description, releaseDate} = movieDetails;
        const sql = 'INSERT INTO movies (title, description, release_date) VALUES (?, ?, ?)';
        const [result] = await this.connection.execute(sql, [title, description, releaseDate]);
        return result;
    }

    // Takes in relevant movie ID as a parameter
    async removeMovie(movieId) {
        const sql = 'DELETE FROM movies WHERE id = ?';
        const [result] = await this.connection.execute(sql, [movieId]);
        return result;
    }

    // Needs both the movie ID and a struct containing the new details
    async editMovie(movieId, newDetails) {
        const {title, description, releaseDate} = newDetails;
        const sql = 'UPDATE movies SET title = ?, description = ?, release_date = ? WHERE id = ?';
        const [result] = await this.connection.execute(sql, [title, description, releaseDate, movieId]);
        return result;
    }

    // Adds a showtime for the movie associated with the provided ID, uses the supplied struct
    async addShowtime(movieId, showtimeDetails) {
        // god this is ugly, I should clean this up later
        const {showtime} = showtimeDetails; // assuming 'showtime' is a datetime
        const sql = 'INSERT INTO showtimes (movie_id, showtime) VALUES (?, ?)';
        const [result] = await this.connection.execute(sql, [movieId, showtime]);
        return result;
    }

    // More shit to come
}

export default DatabaseOperations;
