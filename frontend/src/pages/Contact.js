import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import GlobalNavbar from './Navbar'; // Import the global navbar
import './ContactUs.css'; // Import the CSS file for styling
import Footer from './Footer'; // Correctly import Footer component
function Contact() {
  const [formInfo, setFormInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = formInfo;
    if (!firstName || !lastName || !email || !message) {
      return handleError('All fields are required');
    }
    try {
      // Send data to the server (mock function or actual endpoint)
      handleSuccess('Your message has been sent successfully!');
    } catch (err) {
      handleError(err.message || 'An error occurred');
    }
  };

  return (
    <div className='contact-page-container'>
      <GlobalNavbar /> {/* Include the global navbar */}
      <div className='contact-wrapper'>
        <div className='contact-info'>
          <h1>Contact Us</h1>
          <p>Now to get in touch with us? Either fill out the form with your inquiry or find the admin email you'd like to contact below.</p>
        </div>
        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='name-fields'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formInfo.firstName}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formInfo.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formInfo.email}
            onChange={handleChange}
            required
          />
          <textarea
            name='message'
            placeholder='What can we help you with?'
            value={formInfo.message}
            onChange={handleChange}
            required
          />
          <button type='submit'>Submit</button>
        </form>
        <ToastContainer />
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
}

export default Contact;
