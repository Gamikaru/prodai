import axios from 'axios';
import logging from 'loglevel';
import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
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

    return (
        <UserProfileProvider>

            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <nav className="bg-gray-800 p-4 text-white flex gap-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    {!token && <Link to="/register" className="hover:underline">Register</Link>}
                    {!token && <Link to="/login" className="hover:underline">Login</Link>}
                    {token && <Link to="/plans" className="hover:underline">My Plans</Link>}
                    {token && <Link to="/chat" className="hover:underline">Chat with AI</Link>}
                    {token && <Link to="/onboarding" className="hover:underline">Onboarding</Link>}
                    {token && (
                        <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600">
                            Logout
                        </button>
                    )}
                </nav>
                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage setToken={setToken} />} />
                        <Route path="/login" element={<LoginPage setToken={setToken} />} />
                        <Route path="/plans" element={<PlanPage token={token} />} />
                        <Route path="/chat" element={<ChatPage token={token} />} /> {/* Added token prop */}
                        <Route path="/onboarding" element={<MultiStepForm token={token} />} /> {/* Pass token prop */}
                    </Routes>
                </div>
            </Router>
        </UserProfileProvider>
    );
}

export default App;