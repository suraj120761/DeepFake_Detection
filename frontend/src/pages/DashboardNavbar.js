// dashboardnavbar.js
import React from 'react';
import './DashboardNavbar.css';

function DashboardNavbar({ username, onLogout }) {
    return (
        <nav className="dashboard-navbar">
            <div className="dashboard-navbar-brand">DEEPFAKE DETECTION</div>
            <div className="dashboard-navbar-content">
                <span>{username ? `Welcome, ${username}` : 'Welcome'}</span>
                <button className="dashboard-logout-button" onClick={onLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
