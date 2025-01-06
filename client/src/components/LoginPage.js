import logging from 'loglevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../services/api'; // Adjust the import path as necessary

const logger = logging.getLogger("LoginPage");
logger.setLevel('debug');

export default function LoginPage({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        logger.debug("Login attempt:", { email, password });
        try {
            logger.debug("Sending POST request to /auth/login");
            const res = await api.post('/auth/login', { email, password });
            logger.debug("Login response:", res.data);
            const { access_token } = res.data;
            setToken(access_token);
            localStorage.setItem('token', access_token);
            logger.info("Token set and stored in localStorage.");
        } catch (err) {
            logger.error("Login error:", err);
            alert('Login failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => {
                        logger.debug("Email input changed:", e.target.value);
                        setEmail(e.target.value);
                    }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => {
                        logger.debug("Password input changed.");
                        setPassword(e.target.value);
                    }}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};