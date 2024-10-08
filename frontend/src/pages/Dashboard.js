// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import backgroundImage from './ashish.webp'; // Ensure correct path
import DashboardNavbar from './DashboardNavbar';

function Dashboard() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/'); // Redirect to Welcome page
    };

    return (
        <div className="dashboard-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="dashboard-overlay">
                <DashboardNavbar username={username} onLogout={handleLogout} />
                <div className="dashboard-content">
                    <h1 className="title">DEEPFAKE DETECTION</h1>
                    <p className="description">
                        Welcome to our Deepfake Detection Website!
                        <br />
                        At the forefront of technological innovation, we utilize cutting-edge AI algorithms to scrutinize videos and images for any signs of manipulation. Our system is designed to identify subtle alterations and tampering that may not be visible to the naked eye. With the rise of deepfake technology, ensuring the authenticity of digital media is more crucial than ever. Our platform provides reliable, fast, and accurate analysis to help you trust the content you see online. Whether you're a journalist, researcher, or concerned citizen, our advanced tools empower you to make informed decisions and maintain digital integrity. Explore our services and experience the future of media verification!
                    </p>
                    <button className="btn-start" onClick={() => navigate('/upload')}>GET STARTED</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
