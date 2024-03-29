import React from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';

function Admin() {
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
          <a href="/login"> Logout </a>
        </div>
      </nav>

      <div className="main-content">
        <div className="admin-option">
        <button><Link to="/managemovies">Manage Movies</Link></button>
          <p>Add, edit, or delete movies</p>
          {/* add movie api stuff below each */}
        </div>
        <div className="admin-option">
          <h3>Manage Users</h3>
          <p>View and manage user accounts</p>
         
        </div>
        <div className="admin-option">
          <button><Link to="/managepromotions">Manage Promotions</Link></button>
          <p>Create, edit, or delete promotions</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
