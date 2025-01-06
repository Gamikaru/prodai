import logging from 'loglevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../services/api'; // Adjust the import path as necessary

const logger = logging.getLogger("RegisterPage");
logger.setLevel('debug');

export default function RegisterPage({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        logger.debug("Registering user with email:", email);
        try {
            logger.debug("Sending POST request to /auth/register");
            const res = await api.post('/auth/register', { email, password });
            logger.info("Registration successful for email:", res.data.email);
            alert('Registration successful. You can log in now!');
        } catch (err) {
            logger.error("Registration error:", err);
            alert('Registration failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => {
                        logger.debug("Email input changed:", e.target.value);
                        setEmail(e.target.value);
                    }}
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
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Register
                </button>
            </form>
        </div>
    );
}

RegisterPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};