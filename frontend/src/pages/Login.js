
/*login.js*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import './Login.css'; // Import the CSS file
import GlobalNavbar from './Navbar';
function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = "http://localhost:4040/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);

                // Store JWT token and username in localStorage
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('username', name);

                setTimeout(() => {
                    navigate('/dashboard'); // Redirect to dashboard after login
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || 'An error occurred');
        }
    };

    return (
        <div className='login-page-container'> {/* Changed to login-page-container */}
        <GlobalNavbar />
            <div className='login-wrapper'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    onChange={handleChange}
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email...'
                                    value={loginInfo.email}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    onChange={handleChange}
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={loginInfo.password}
                                    required
                                />
                            </div>
                        </div>
                        <button type='submit'>Login</button>
                        <span>Don't have an account? <Link to="/signup"> Signup</Link></span>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;
