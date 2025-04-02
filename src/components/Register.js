// src/UserRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username,
                password,
            });
            setMessage(`User registered: ${response.data.username}`);
            navigate('/');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>User Registration</h2>
            <form onSubmit={handleRegister}>
                <div className='mb-3'>
                    <label className='form-label'>Username:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-primary'>Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserRegistration;
