import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import GlobalNavbar from './Navbar'; // Adjust the import path as necessary
import GlobalFooter from './Footer'; // Adjust the import path as necessary
import './Abstract.css'; // Create a separate CSS file for the Abstract page
import detectImage from './detect.jpg'; // This is your logo image

function Abstract() {
  return (
    <div className="abstract-page">
      <GlobalNavbar />
      <div className="logo-container">
        <Image src={detectImage} className="logo" /> {/* Circular logo */}
      </div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mb-4">Abstract</h1>
            <p className="abstract-text">
              In recent years, the proliferation of deepfake technology has raised significant concerns regarding the authenticity of video content. Our project focuses on the development of an advanced AI/ML-based solution designed to detect face-swap deepfake videos. By leveraging state-of-the-art machine learning algorithms and computer vision techniques, we aim to identify subtle discrepancies and artifacts introduced during the face-swapping process.
              <br /><br />
              Our approach involves the training of neural networks on extensive datasets of both genuine and manipulated videos. This allows the system to learn to recognize the intricate patterns and anomalies associated with face-swaps. Additionally, our solution integrates real-time processing capabilities to provide immediate feedback on the authenticity of video content.
              <br /><br />
              The development process includes the collection and preprocessing of video data, the implementation of various AI models, and the rigorous testing of our detection methods. We aim to deliver a robust tool that can effectively counteract the spread of misleading and deceptive media, thereby contributing to the integrity of digital information.
              <br /><br />
              This project represents a significant step forward in the fight against deepfake misuse, enhancing our ability to discern reality from sophisticated fabrications in visual media.
            </p>
          </Col>
        </Row>
      </Container>
      <GlobalFooter />
    </div>
  );
}

export default Abstract;
