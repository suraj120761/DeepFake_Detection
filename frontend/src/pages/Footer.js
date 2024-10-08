import React from 'react';
import './Footer.css'; // CSS for the footer styling

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section about'>
          <h3>About Us</h3>
          <p>
            We are committed to providing excellent customer service and are here to assist you with any inquiries.
          </p>
        </div>
        <div className='footer-section links'>
          <h3>Quick Links</h3>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/services'>Services</a></li>
            <li><a href='/contact'>Contact</a></li>
          </ul>
        </div>
        <div className='footer-section contact-info'>
          <h3>Contact Info</h3>
          <p>Email: suraj00036177@gmail.com</p>
          <p>Phone: +91 8639450379</p>
        </div>
        <div className='footer-section social-media'>
          <h3>Follow Us</h3>
          <div className='social-icons'>
            <a href='#' aria-label="Facebook"><i className='fab fa-facebook-f'></i></a>
            <a href='#' aria-label="Twitter"><i className='fab fa-twitter'></i></a>
            <a href='#' aria-label="Instagram"><i className='fab fa-instagram'></i></a>
            <a href='#' aria-label="LinkedIn"><i className='fab fa-linkedin-in'></i></a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 SIH Pixel Proof. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
