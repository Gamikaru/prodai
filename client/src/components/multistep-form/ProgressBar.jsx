import { motion } from 'framer-motion';
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <motion.div
                className="bg-indigo-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
            ></motion.div>
        </div>
    );
};

export default ProgressBar;