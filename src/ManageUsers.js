import React, { useState, useEffect } from 'react';
import API from './API';
import './ManageUsers.css';

// function ManageUsers() {
  
//   };
function ManageUsers() {

return (
    <div className="manage-users">
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
        <h2>Manage Users</h2>
        <div className="user-list">
            <table>
                <tr>
                    <td><h3>Username</h3></td>
                    <td><h3>User Type</h3></td>
                    <td><h3>Delete User</h3></td>
                </tr>
                <tr>
                    <td>brandontest</td>
                    <td>Admin</td>
                    <td><button type="submit">Delete</button></td>
                </tr>
            </table>
        </div>
    </div>
    </div>
);
}

export default ManageUsers;


