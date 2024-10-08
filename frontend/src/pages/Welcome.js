import React, { useEffect } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import GlobalNavbar from './Navbar';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const carouselElement = document.querySelector('.welcome-carousel');
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 6000, // 6 seconds interval for slide transition
        ride: 'carousel'
      });
      return () => {
        carousel.dispose(); // Clean up on unmount
      };
    }
  }, []);

  const handleStartClick = () => {
    navigate('/login'); // Navigate to login page
    navigate('/Abstract')
  };

  return (
    <div className="welcome-page">
      <GlobalNavbar />
      <div className="welcome-content">
        <h1 className="display-4 text-center">
          DEEP FAKE DETECTION USING ARTIFICIAL INTELLIGENCE
        </h1>
        <Carousel className="welcome-carousel">
          <Carousel.Item>
            <Carousel.Caption>
              <h3>Understanding Deepfakes</h3>
              <p>
                Deepfakes use AI to create realistic fake videos and images.
                This technology can manipulate media content, leading to
                misinformation.
                <br />
                Our project focuses on detecting these alterations.
                <br />
                We analyze video frames and audio to identify inconsistencies.
                <br />
                Our approach combines computer vision and machine learning.
                <br />
                The goal is to build robust detection methods to combat misuse.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption>
              <h3>Challenges in Detection</h3>
              <p>
                Detecting deepfakes presents several challenges.
                <br />
                The subtle changes in facial expressions can be hard to spot.
                <br />
                Variations in lighting and angle complicate detection further.
                <br />
                We address these issues using advanced algorithms and training.
                <br />
                Our system is designed to adapt to evolving deepfake techniques.
                <br />
                Continuous updates and improvements are essential.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption>
              <h3>Our Approach</h3>
              <p>
                We utilize a multi-step approach to detect deepfakes.
                <br />
                First, we pre-process videos to enhance quality and consistency.
                <br />
                Next, we extract features from each frame for analysis.
                <br />
                Our AI models then compare these features to known patterns.
                <br />
                We use a combination of supervised and unsupervised learning.
                <br />
                This approach allows us to detect a wide range of manipulations.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption>
              <h3>Future Developments</h3>
              <p>
                The field of deepfake detection is rapidly evolving.
                <br />
                We aim to incorporate the latest advancements in AI technology.
                <br />
                Future updates will focus on improving accuracy and efficiency.
                <br />
                We plan to collaborate with other research teams and experts.
                <br />
                Our long-term goal is to establish industry-wide standards.
                <br />
                We are committed to enhancing digital media integrity.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="button-group mt-4">
          
          <Button variant="primary" onClick={handleStartClick}>Abstract</Button>
          <Button variant="primary" onClick={handleStartClick}>Start</Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
