import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './UploadVideo.css';
import DashboardNavbar from './DashboardNavbar'; // Ensure this matches the actual component name

function UploadVideo() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [result, setResult] = useState(''); // State for displaying the prediction result
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation

  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedVideo(videoFile); // Store the selected video in state
  };

  const handleUpload = async () => {
    if (!selectedVideo) {
      alert('Please select a video file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedVideo); // Attach video to form data for upload

    setLoading(true); // Set loading indicator

    try {
      // Send the video file to the Flask backend
      const response = await axios.post('http://localhost:5005/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the result with the prediction from the server
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error uploading video:', error);
      setResult('Error uploading video.');
    } finally {
      setLoading(false); // Reset loading indicator
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/'); // Redirect to Welcome page on logout
  };

  return (
    <div className="upload-video-page">
      <DashboardNavbar  username={'username'} onLogout={handleLogout} />
      <div className="upload-video-content">
        <h2 className="mb-4">Upload Your Video</h2>
        <div className="video-upload-slot">
          <input
            type="file"
            accept="video/*"
            className="form-control"
            onChange={handleVideoChange} // Handle video selection
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
        {selectedVideo && (
          <div className="video-preview mt-4">
            <p>Selected Video: {selectedVideo.name}</p>
            <p>{result}</p>
          </div>
        )}
        <textarea
          className="form-control mt-3"
          rows="4"
          readOnly
          value={result} // Display the result in a textarea
        />
        <button className="btn btn-secondary mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
