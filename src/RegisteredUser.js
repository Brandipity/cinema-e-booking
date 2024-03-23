
// RegisteredUser.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from './Movie';
import './GuestPage.css';

function RegisteredUser() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    fetch('http://localhost:3001/api/movies/now-playing')
        .then(response => response.json())
        .then(data => setCurrentMovies(data || []))
        .catch(err => console.error("Failed to fetch current movies:", err));
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.trim()) {
      // filter based on search
      const filteredResults = currentMovies.filter(movie =>
          movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie) => {
    navigate('/ticketbooking', { state: { movie } });
  };

  return (
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <span>E-CINEMA</span>
          </div>
          <div className="navbar-center">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
            />
          </div>
          <div className="navbar-right">
            <a href="#">Home</a>
            <a href="#">Showings</a>
            <a href="/login">Log Out</a>
            <a href="/cart">Cart</a>
          </div>
        </nav>

        <div className="main-content">
          <div className="main-section">
            <h2>Currently Running</h2>
            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {searchTerm.trim() ?
                  searchResults.map(movie => (
                      <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
                  )) :
                  currentMovies.map(movie => (
                      <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
                  ))
              }
              //<h2>Currently Running</h2>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="footer">
          <div className="footer-category">
            <h3>Account</h3>
            <ul>
              <li><a href="/login">Log Out</a></li>
              <li><a href="/manageaccount">Manage Account</a></li>
            </ul>
          </div>

          <div className="footer-category">
            <h3>View Bookings</h3>
            <ul>
              <li>View Theaters</li>
              <li>Promotions & Deals</li>
            </ul>
          </div>

          <div className="footer-category">
            <h3>Contact</h3>
            <ul>
              <li>Email</li>
              <li>Creators</li>
            </ul>
          </div>
        </footer>
      </div>
  );
}

export default RegisteredUser;

