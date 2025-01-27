import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles.css'; // Import styles

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            alert('Login successful');
            console.log(response.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#6a11cb', textDecoration: 'none' }}>
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default Login;
