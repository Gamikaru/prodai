import logging from 'loglevel';
import React from 'react';

logging.debug("Rendering HomePage component.");

export default function HomePage() {
    logging.info("HomePage rendered.");

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Welcome to the AI Planner!</h1>
            <p>Plan your day, set goals, and chat with AI!</p>
        </div>
    );
}
