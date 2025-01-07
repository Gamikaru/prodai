import { motion } from 'framer-motion';
import logging from 'loglevel';
import React from 'react';
import { FaCalendarCheck, FaComments, FaRocket } from 'react-icons/fa';

logging.debug("Rendering HomePage component.");

export default function HomePage() {
  logging.info("HomePage rendered.");

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-gray-800 dark:text-gray-100 transition-colors duration-300"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Welcome to the AI Planner!
      </h1>
      <p className="text-center text-lg mb-8">
        Plan your day, set goals, and chat with AI to boost your productivity and achieve your dreams.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaRocket className="text-indigo-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Set Goals</h2>
          <p className="text-center">
            Define your objectives and let the AI help you create a roadmap to achieve them effectively.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaCalendarCheck className="text-green-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Plan Your Day</h2>
          <p className="text-center">
            Organize your daily tasks with intelligent scheduling that adapts to your preferences and priorities.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaComments className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Chat with AI</h2>
          <p className="text-center">
            Get real-time assistance, tips, and motivation from our AI to stay on track and overcome challenges.
          </p>
        </motion.div>
      </div>
      <motion.button
        className="mt-8 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.location.href='/register'}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}