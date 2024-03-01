// GuestPage.js

import React, { useState, useEffect } from 'react';
import API from './API';
import Movie from './Movie';
import './GuestPage.css';

function GuestPage() {
    const [currentMovies, setCurrentMovies] = useState([]);
    const [comingSoonMovies, setComingSoonMovies] = useState([]);

    useEffect(() => {

        API.fetchMovies()
            .then(data => setCurrentMovies(data.results || []))
            .catch(err => console.error("Failed to fetch current movies:", err));

        API.fetchComingSoonMovies()
            .then(data => setComingSoonMovies(data.results || []))
            .catch(err => console.error("Failed to fetch coming soon movies:", err));
    }, []);

    return (
        <div className="App">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <span>E-CINEMA</span>
                </div>
                <div className="navbar-center">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="navbar-right">
                    <a href="#">Home</a>
                    <a href="#">Showings</a>
                    <a href="/login">Login</a>
                    <a href="/cart">Cart</a>
                </div>
            </nav>

            <div className="main-content">
                {/* Currently Playing Movies Section */}
                <div className="main-section">
                    <h2>Currently Running</h2>
                    <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {currentMovies.map(movie => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>

                {/* Coming Soon Movies Section */}
                <div className="main-section">
                    <h2>Coming Soon</h2>
                    <div className="movie-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {comingSoonMovies.map(movie => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </div>

            <footer className="footer">
                {/* no footer...yet*/}
            </footer>
        </div>
    );
}

export default GuestPage;

