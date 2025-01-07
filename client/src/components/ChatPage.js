import { motion } from 'framer-motion';
import logging from 'loglevel';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaRegSmile, FaSave, FaThumbsDown, FaThumbsUp, FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';

const logger = logging.getLogger("ChatPage");
logger.setLevel('debug');

const AI_PERSONAS = [
    { id: '1', name: 'Motivational Coach', prompt: 'You are a motivational coach who inspires users to achieve their goals.' },
    { id: '2', name: 'Analytical Planner', prompt: 'You are an analytical planner who helps users organize their schedules efficiently.' },
    { id: '3', name: 'Friendly Assistant', prompt: 'You are a friendly assistant ready to help with any queries.' },
];

// Define motion variants for page transitions
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        y: -20,
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
};

export default function ChatPage({ token }) {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedPersona, setSelectedPersona] = useState(AI_PERSONAS[0].id);
    const [isVoiceInput, setIsVoiceInput] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isLoading]);

    const handlePersonaChange = (e) => {
        setSelectedPersona(e.target.value);
        logger.debug("AI persona changed to:", e.target.value);
    };

    const handleFeedback = (response, messageId) => {
        setFeedback(response);
        logger.debug("User feedback:", response);
        // Optionally associate feedback with messageId
    };

    const handleSaveConversation = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            logger.info("Conversation saved successfully.");
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const startVoiceInput = () => {
        setIsVoiceInput(true);
        logger.debug("Voice input started.");
        alert('Voice input functionality is under development.');
    };

    const stopVoiceInput = () => {
        setIsVoiceInput(false);
        logger.debug("Voice input stopped.");
        alert('Voice input functionality is under development.');
    };

    const handleDeleteMessage = (id) => {
        setChatHistory(prev => prev.filter(message => message.id !== id));
        logger.debug("Deleted message with id:", id);
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        logger.debug("Chat attempt with prompt:", prompt);

        const userMessage = { id: uuidv4(), sender: 'user', content: prompt, timestamp: new Date() };
        setChatHistory((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            logger.debug("Sending POST request to /ai/chat");
            const res = await api.post('/ai/chat', {
                prompt,
                persona: AI_PERSONAS.find(p => p.id === selectedPersona).prompt
            });
            logger.debug("Chat response:", res.data);
            const aiReply = { id: uuidv4(), sender: 'ai', content: res.data.reply, timestamp: new Date() };
            setChatHistory((prev) => [...prev, aiReply]);
            logger.info("Received AI reply.");
        } catch (err) {
            logger.error("Chat error:", err);
            alert('Error with AI chat.');
        } finally {
            setPrompt('');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col min-h-[80vh] transition-colors duration-300"
        >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Chat with AI
            </h2>

            <div className="mb-6">
                <label htmlFor="persona" className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Select AI Persona:
                </label>
                <motion.select
                    id="persona"
                    value={selectedPersona}
                    onChange={handlePersonaChange}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition duration-200 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400"
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                >
                    {AI_PERSONAS.map(persona => (
                        <option key={persona.id} value={persona.id}>{persona.name}</option>
                    ))}
                </motion.select>
            </div>

            <div className="flex-1 overflow-y-auto mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
                {chatHistory.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500 dark:text-gray-400"
                    >
                        <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="text-lg">Start a conversation with the AI!</p>
                    </motion.div>
                )}
                {chatHistory.map(message => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} mb-4`}
                    >
                        <motion.div
                            className={`relative max-w-[70%] px-6 py-4 rounded-2xl shadow-md transition-transform duration-200
                                ${message.sender === 'ai'
                                    ? 'bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100'
                                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                }`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 absolute bottom-2 right-4">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <motion.button
                                onClick={() => handleDeleteMessage(message.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none"
                                aria-label="Delete message"
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTrash className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mb-4"
                    >
                        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>

            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Was this response helpful?</p>
                    <div className="flex gap-4">
                        <motion.button
                            onClick={() => handleFeedback('thumbs_up')}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaThumbsUp /> Yes
                        </motion.button>
                        <motion.button
                            onClick={() => handleFeedback('thumbs_down')}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaThumbsDown /> No
                        </motion.button>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleChat} className="space-y-4">
                <motion.textarea
                    rows="3"
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask me anything..."
                    required
                    whileFocus={{ scale: 1.02 }}
                />
                <div className="flex items-center justify-between gap-4">
                    <motion.button
                        type="button"
                        onClick={isVoiceInput ? stopVoiceInput : startVoiceInput}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-transform duration-200
                            ${isVoiceInput
                                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                                : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                            } focus:outline-none focus:ring-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaMicrophone className="text-lg" />
                        {isVoiceInput ? 'Stop' : 'Voice Input'}
                    </motion.button>

                    <div className="flex gap-4">
                        <motion.button
                            type="submit"
                            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={handleSaveConversation}
                            disabled={isSaving}
                            className={`flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-transform duration-200
                                ${!isSaving ? 'hover:scale-105 focus:ring-yellow-500' : 'opacity-50 cursor-not-allowed'}
                            focus:outline-none focus:ring-2`}
                            whileHover={!isSaving ? { scale: 1.05 } : {}}
                            whileTap={!isSaving ? { scale: 0.95 } : {}}
                        >
                            <FaSave /> {isSaving ? 'Saving...' : 'Save'}
                        </motion.button>
                        {saved && (
                            <motion.span
                                className="flex items-center gap-1 text-green-500 animate-pulse"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                            >
                                <FaRegSmile /> Saved!
                            </motion.span>
                        )}
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

ChatPage.propTypes = {
    token: PropTypes.string.isRequired,
};