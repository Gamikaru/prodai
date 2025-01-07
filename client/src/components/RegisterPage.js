import logging from 'loglevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../services/api';

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
        <div className="max-w-md mx-auto bg-white dark:bg-trueGray-900 p-6 rounded-md shadow text-gray-800 dark:text-gray-100 transition-all">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 dark:border-trueGray-700 p-2 rounded-md bg-white dark:bg-trueGray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
                    value={email}
                    onChange={(e) => {
                        logger.debug("Email input changed:", e.target.value);
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 dark:border-trueGray-700 p-2 rounded-md bg-white dark:bg-trueGray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
                    value={password}
                    onChange={(e) => {
                        logger.debug("Password input changed.");
                        setPassword(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

RegisterPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};