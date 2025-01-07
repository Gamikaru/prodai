// ChatPage.jsx

import logging from 'loglevel';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';

// Import icons or any additional libraries if needed
import { FaMicrophone, FaRegSmile, FaSave, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

// Initialize logger
const logger = logging.getLogger("ChatPage");
logger.setLevel('debug');

// Placeholder AI personas
const AI_PERSONAS = [
    { id: '1', name: 'Motivational Coach', prompt: 'You are a motivational coach who inspires users to achieve their goals.' },
    { id: '2', name: 'Analytical Planner', prompt: 'You are an analytical planner who helps users organize their schedules efficiently.' },
    { id: '3', name: 'Friendly Assistant', prompt: 'You are a friendly assistant ready to help with any queries.' },
];

export default function ChatPage({ token }) {
    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedPersona, setSelectedPersona] = useState(AI_PERSONAS[0].id);
    const [isVoiceInput, setIsVoiceInput] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const audioRef = useRef(null);

    // Function to handle AI persona selection
    const handlePersonaChange = (e) => {
        setSelectedPersona(e.target.value);
        logger.debug("AI persona changed to:", e.target.value);
    };

    // Function to handle feedback
    const handleFeedback = (response) => {
        setFeedback(response);
        logger.debug("User feedback:", response);
        // Placeholder: Send feedback to backend when implemented
    };

    // Function to handle saving conversations
    const handleSaveConversation = () => {
        setIsSaving(true);
        // Placeholder: Implement save functionality once backend is ready
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            logger.info("Conversation saved successfully.");
        }, 1000);
    };

    // Function to start voice input (placeholder)
    const startVoiceInput = () => {
        setIsVoiceInput(true);
        // Placeholder: Implement voice-to-text functionality
        logger.debug("Voice input started.");
        alert('Voice input functionality is under development.');
    };

    // Function to stop voice input (placeholder)
    const stopVoiceInput = () => {
        setIsVoiceInput(false);
        // Placeholder: Implement voice-to-text functionality
        logger.debug("Voice input stopped.");
        alert('Voice input functionality is under development.');
    };

    const handleChat = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        logger.debug("Chat attempt with prompt:", prompt);

        // Add user message to chat history
        const userMessage = { id: uuidv4(), sender: 'user', content: prompt };
        setChatHistory((prev) => [...prev, userMessage]);

        try {
            logger.debug("Sending POST request to /ai/chat");
            const res = await api.post('/ai/chat', {
                prompt,
                persona: AI_PERSONAS.find(p => p.id === selectedPersona).prompt
            });
            logger.debug("Chat response:", res.data);
            const aiReply = { id: uuidv4(), sender: 'ai', content: res.data.reply };
            setChatHistory((prev) => [...prev, aiReply]);
            setReply(res.data.reply);
            logger.info("Received AI reply.");
        } catch (err) {
            logger.error("Chat error:", err);
            alert('Error with AI chat.');
        } finally {
            setPrompt('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4">Chat with AI</h2>

            {/* AI Persona Selection */}
            <div className="mb-4">
                <label htmlFor="persona" className="block text-sm font-medium text-gray-700 mb-1">Select AI Persona:</label>
                <select
                    id="persona"
                    value={selectedPersona}
                    onChange={handlePersonaChange}
                    className="block w-full border border-gray-300 rounded p-2"
                >
                    {AI_PERSONAS.map(persona => (
                        <option key={persona.id} value={persona.id}>{persona.name}</option>
                    ))}
                </select>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-200 rounded">
                {chatHistory.length === 0 && (
                    <p className="text-gray-500">Start a conversation with the AI!</p>
                )}
                {chatHistory.map(message => (
                    <div key={message.id} className={`mb-2 ${message.sender === 'ai' ? 'text-left' : 'text-right'}`}>
                        <span className={`inline-block px-4 py-2 rounded ${message.sender === 'ai' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>
                            {message.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Feedback Section */}
            {reply && (
                <div className="mb-4">
                    <p className="font-semibold">Was this response helpful?</p>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => handleFeedback('thumbs_up')}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            <FaThumbsUp /> Yes
                        </button>
                        <button
                            onClick={() => handleFeedback('thumbs_down')}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            <FaThumbsDown /> No
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Input Form */}
            <form onSubmit={handleChat} className="flex flex-col gap-4">
                <textarea
                    rows="3"
                    className="border border-gray-300 p-2 rounded resize-none"
                    value={prompt}
                    onChange={(e) => {
                        logger.debug("Prompt input changed:", e.target.value);
                        setPrompt(e.target.value);
                    }}
                    placeholder="Ask me anything..."
                    required
                />
                <div className="flex items-center justify-between">
                    {/* Voice Input Button */}
                    <button
                        type="button"
                        onClick={isVoiceInput ? stopVoiceInput : startVoiceInput}
                        className={`flex items-center gap-2 px-3 py-2 rounded ${isVoiceInput ? 'bg-red-500' : 'bg-green-500'} text-white hover:bg-opacity-80`}
                    >
                        <FaMicrophone />
                        {isVoiceInput ? 'Stop' : 'Voice Input'}
                    </button>

                    {/* Submit and Save Buttons */}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Send
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveConversation}
                            className={`flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSaving}
                        >
                            <FaSave /> {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        {saved && (
                            <span className="text-green-600 flex items-center gap-1">
                                <FaRegSmile /> Saved!
                            </span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

ChatPage.propTypes = {
    token: PropTypes.string.isRequired, // Ensure PropTypes are defined
};
