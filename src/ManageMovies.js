import React, { useState, useEffect } from 'react';
import API from './API';
import './ManageMovies.css';


function ManageMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    API.fetchMovies().then(data => {
      setMovies(data.results || []);
    });
  }, []);

  const handleAddMovie = async (movie) => {

    const { id, title, overview: description, release_date: releaseDate } = movie;

    try {
      const response = await fetch('http://localhost:3001/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, description, releaseDate }),
      });

      if (response.ok) {
        console.log("Movie added successfully");

      } else {
        throw new Error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <span>E-CINEMA</span>
          </div>
          <div className="navbar-center">
            <input type="text" placeholder="Search" />
          </div>
          <div className="navbar-right">
            <a href="/registereduser"> Home </a>
            <a href="/admin"> Admin </a>
          </div>
        </nav>
        <div className="main-content">
          <h2>Manage Movies</h2>
          <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                  {movie.title}
                  <button onClick={() => handleAddMovie(movie)}>Add to Database</button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default ManageMovies;


