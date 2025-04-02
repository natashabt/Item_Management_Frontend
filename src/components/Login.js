// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', null, {
                params: {
                    username,
                    password,
                },
            });
            // Save username and password in local storage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            navigate('/items')
        } catch (error) {
            console.error("Login failed:", error);
        }
    };



    return (
        <div className='container mt-5'>
            <h2>User Login</h2>
            <div className='mb-3'>
                <label className='form-label'>Username: </label>
                <input
                    type="text"
                    className='form-control'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password: </label>
            <input
                type="password"
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button onClick={handleLogin} className="btn btn-primary mx-2">Login</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/register') }>Register</button>
        </div>
    );
};

export default Login;
