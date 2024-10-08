/*signup.js*/
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import './Signup.css'; // Make sure to import your CSS file
import GlobalNavbar from './Navbar'; // Import the global navbar
function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = "http://localhost:4040/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after signup
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='signup-page-container'> {/* Centering and background image */}
        <GlobalNavbar />
            <div className='signup-wrapper'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className='input-wrapper'>
                        <i className="fas fa-user"></i>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            required
                        />
                    </div>
                    <div className='input-wrapper'>
                        <i className="fas fa-envelope"></i>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            required
                        />
                    </div>
                    <div className='input-wrapper'>
                        <i className="fas fa-lock"></i>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            required
                        />
                    </div>
                    <button type='submit'>Signup</button>
                    <span>Already have an account? 
                        <Link to="/login"> Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup;
