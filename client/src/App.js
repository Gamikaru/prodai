import axios from 'axios';
import logging from 'loglevel';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation'; // New Navigation component
import PlanPage from './components/PlanPage';
import RegisterPage from './components/RegisterPage';
import MultiStepForm from './components/multistep-form/OnboardingForm';
import { UserProfileProvider } from './contexts/UserProfileContext';
const logger = logging.getLogger("App");
logger.setLevel('debug');

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    logger.debug("Initial token state:", token);

    useEffect(() => {
        logger.debug("Setting up Axios interceptor for token:", token);
        const interceptor = axios.interceptors.request.use((config) => {
            if (token) {
                config.headers['token'] = token;
                logger.debug("Added token to request headers.");
            }
            return config;
        }, (error) => {
            logger.error("Axios request interceptor error:", error);
            return Promise.reject(error);
        });

        return () => {
            logger.debug("Ejecting Axios interceptor.");
            axios.interceptors.request.eject(interceptor);
        };
    }, [token]);

    const handleLogout = () => {
        logger.info("User logging out.");
        setToken('');
        localStorage.removeItem('token');
        logger.debug("Token removed from state and localStorage.");
    };

    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'Register', path: '/register', auth: 'guest' },
        { name: 'Login', path: '/login', auth: 'guest' },
        { name: 'My Plans', path: '/plans', auth: 'user' },
        { name: 'Chat with AI', path: '/chat', auth: 'user' },
        { name: 'Onboarding', path: '/onboarding', auth: 'user' },
    ];

    return (
        <UserProfileProvider>
            <Router>
                <div className="w-full">
                    <Navigation navigation={navigation} token={token} handleLogout={handleLogout} />
                </div>

                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage setToken={setToken} />} />
                        <Route path="/login" element={<LoginPage setToken={setToken} />} />
                        <Route path="/plans" element={<PlanPage token={token} />} />
                        <Route path="/chat" element={<ChatPage token={token} />} />
                        <Route path="/onboarding" element={<MultiStepForm token={token} />} />
                    </Routes>
                </div>
            </Router>
        </UserProfileProvider>
    );
}

export default App;