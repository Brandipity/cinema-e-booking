// Movie.js
// we love components.

import { useNavigate } from 'react-router-dom';

function Movie({ movie }) {
    const navigate = useNavigate();


    // placeholder
    const handleMovieClick = () => {
        navigate('/ticketbooking', { state: { movie } });
    };
    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} onClick={handleMovieClick} style={{ width: '200px' }} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
}

export default Movie;
