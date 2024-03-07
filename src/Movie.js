// Movie.js
// we love components.

import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import API from './API';

function Movie({ movie }) {
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (movie.tmdbId) {
            API.fetchMovieDetails(movie.tmdbId)
                .then(data => {
                    setDetails(data);
                })
                .catch(err => console.error("Failed to fetch movie details from TMDb:", err));
        }
    }, [movie.tmdbId]);

    // handles case where TMDb details are not yet fetched, gives the user some feedback ig
    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie" onClick={() => navigate('/ticketbooking', { state: { movie: details } })}>
            <img src={`https://image.tmdb.org/t/p/w200${details.poster_path}`} alt={details.title} style={{ width: '200px' }} />
            <h3>{details.title}</h3>
            <p>{details.overview}</p>
        </div>
    );
}
export default Movie;
