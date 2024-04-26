
// RegisteredUser.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from './Movie';
import './GuestPage.css';

function RegisteredUser() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]); //added for upcoming movies
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null); //seach by keyword
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    // fetch currently running movies
    fetch('http://localhost:3001/api/movies/now-playing')
        .then(response => response.json())
        .then(data => setCurrentMovies(data || []))
        .catch(err => console.error("Failed to fetch current movies:", err));

    // fetch upcoming movies
    fetch('http://localhost:3001/api/movies/upcoming')
        .then(response => response.json())
        .then(data => setUpcomingMovies(data || []))
        .catch(err => console.error("Failed to fetch upcoming movies:", err));
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.trim()) {
        // searches movies by title or keyword in the description!
        const filteredResults = currentMovies.filter(movie =>
            movie.title.toLowerCase().includes(value.toLowerCase()) ||
            movie.description.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredResults.length > 0) {
            setSearchResults(filteredResults);
            setSearchMessage(null); // clears previous search message
        } else {
            setSearchResults([]); // clears search results
            setSearchMessage("No movies found. Please try a different search term.");
        }
    } else {
        setSearchResults([]); 
        setSearchMessage(null); 
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
            <h2>Upcoming Movies</h2>
            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {upcomingMovies.map(movie => (
                <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
              ))}
            </div>
            <h2>Currently Running</h2>
            <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {searchTerm.trim() ? (
                searchResults.length > 0 ? (
                  searchResults.map(movie => (
                    <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
                  ))
                  ) : (
                  <p>No movies found. Please try a different search term.</p>
                  )
                  ) : (
                  currentMovies.map(movie => (
                <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
                ))
              )}
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

