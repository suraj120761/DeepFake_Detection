import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import GlobalNavbar from './Navbar'; // Adjust the import path as necessary
import GlobalFooter from './Footer'; // Adjust the import path as necessary
import './AboutUs.css'; // Create a separate CSS file for the About Us page

function AboutUs() {
  const teamMembers = [
    { name: 'P.Suraj', role: 'Project Manager', bio: 'Alice is the project manager who ensures everything runs smoothly. With a background in software engineering, Alice excels at problem-solving and team coordination.' },
    { name: 'B.Ashish Reddy', role: 'Lead Developer', bio: 'Bob is the lead developer responsible for the core architecture of the application. His expertise in full-stack development brings the project to life.' },
    { name: 'K.Preetam', role: 'UI/UX Designer', bio: 'Charlie designs the user interface and ensures a seamless user experience. His creative designs are crucial to making the application visually appealing.' },
    { name: 'G.Aneesh', role: 'Data Scientist', bio: 'David handles data analysis and algorithm development. His work on machine learning models is key to the deepfake detection capabilities of the project.' },
    { name: 'D.Charan Reddy', role: 'Backend Developer', bio: 'Emma focuses on backend development and API integration. Her skills ensure that the server-side logic is robust and efficient.' },
    { name: 'Samskruthi', role: 'Quality Assurance Specialist', bio: 'Frank is responsible for testing and quality assurance. His meticulous testing ensures the application is free of bugs and meets high standards.' }
  ];

  return (
    <div className="about-us-page">
      <GlobalNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">About Us</h1>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={4} lg={3} key={index} className="mb-4">
              <Card className="team-member-card">
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <Card.Text>{member.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <GlobalFooter />
    </div>
  );
}

export default AboutUs;
