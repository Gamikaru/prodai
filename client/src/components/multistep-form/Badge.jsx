import { motion } from 'framer-motion';
import React from 'react';

const Badge = () => {
    return (
        <motion.div
            className="badge bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            role="alert"
        >
            <strong className="font-bold">Congratulations!</strong>
            <span className="block sm:inline"> You have completed the form and earned a badge!</span>
        </motion.div>
    );
};

export default Badge;