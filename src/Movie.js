// Movie.js
// we love components.
function Movie({ movie }) {
    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ width: '200px' }} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
}

export default Movie;
