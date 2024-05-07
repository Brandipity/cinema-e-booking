// API.js

//pretty self-explanatory

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd4f7cf7760722343069877ff07dcc28'; // should probably store this in an environmental variable

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDRmN2NmNzc2MDcyMjM0MzA2OTg3N2ZmMDdkY2MyOCIsInN1YiI6IjY1ZTFhZDAwZGFmNTdjMDE0NzliMGYxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7B--17dx6QQL0GlvakgngzMkYRmLLg0_9Fi5x6d9B8c';

const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
};

class API {

    // Grabs the 'Now Playing' collection (or at least the first page of it, which can be adjusted)
    // Documentation: https://developer.themoviedb.org/reference/movie-now-playing-list
    static fetchMovies() {
        return fetch(`${API_URL}/movie/now_playing?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }

    // Grabs the 'Upcoming' collection (or at least the first page of it, which can be adjusted)
    // Documentation: https://developer.themoviedb.org/reference/movie-upcoming-list
    static fetchComingSoonMovies() {
        return fetch(`${API_URL}/movie/upcoming?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }

    static searchMovies(query) {
        return fetch(`${API_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }

    // Grabs details on a specific movie by ID
    // Documentation: https://developer.themoviedb.org/reference/movie-details
    static fetchMovieDetails(movieId) {
        return fetch(`${API_URL}/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }

    // Grabs imagery (posters, backdrops, etc.) related to a movie
    // Documentation: https://developer.themoviedb.org/reference/movie-images
    static fetchMovieImagery(movieId) {
        return fetch(`${API_URL}/movie/${movieId}/images`, options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }

    // add additional methods here later
}

export default API;
