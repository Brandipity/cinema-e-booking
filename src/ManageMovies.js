import React, { useState, useEffect } from 'react';
import API from './API';
import './ManageMovies.css';

function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    tmdbId: '',
    title: '',
    description: '',
    releaseDate: '',
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleTitleChange = async (e) => {
    const title = e.target.value;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      title: title,
    }));

    if (title.length > 2) {
      try {
        const data = await API.searchMovies(title);
        setSuggestions(data.results);
      } catch (error) {
        console.error('Error searching for movies:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie) => {
    setNewMovie({
      tmdbId: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
    });
    setSuggestions([]);
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/movies/now-playing');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        console.log('Movie added successfully');
        setNewMovie({
          tmdbId: '',
          title: '',
          description: '',
          releaseDate: '',
        });
        fetchMovies();
      } else {
        throw new Error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    console.log("Deleting movie with ID:", movieId);
    try {
      const response = await fetch(`http://localhost:3001/api/movies?movieId=${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Movie deleted successfully');
        fetchMovies();
      } else {
        throw new Error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
      <div className="manage-movies">
        <nav className="navbar">
          <div className="navbar-left">
            <span>E-CINEMA</span>
          </div>
          <div className="navbar-center">
          </div>
          <div className="navbar-right">
            <a href="/registereduser">Home</a>
            <a href="/admin">Admin</a>
          </div>
        </nav>
        <div className="main-content">
          <h2>Manage Movies</h2>
          <form onSubmit={handleAddMovie}>
            <div className="title-input-container">
              <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newMovie.title}
                  onChange={handleTitleChange}
              />
              {suggestions.length > 0 && (
                  <ul className="suggestions">
                    {suggestions.map((movie) => (
                        <li key={movie.id} onClick={() => handleSuggestionClick(movie)}>
                          {movie.title}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
            <input
                name="description"
                placeholder="Description"
                value={newMovie.description}
                onChange={handleInputChange}
            ></input>
            <input
                type="text"
                name="releaseDate"
                placeholder="Release Date"
                value={newMovie.releaseDate}
                onChange={handleInputChange}
            />
            <button type="submit">Add Movie</button>
          </form>
          <h3>Delete Movies</h3>
          <ul>
            {movies.map((movie) => (
                <li key={movie.movie_id}>
                  <span>{movie.title}</span>
                  <button onClick={() => handleDeleteMovie(movie.movie_id)}>Delete</button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default ManageMovies;


