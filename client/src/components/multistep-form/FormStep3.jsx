import { motion } from 'framer-motion';
import React from 'react';

const FormStep3 = ({ prevStep, handleSubmit, isSubmitting }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold mb-6">Step 3: Confirmation</h2>
            <p className="mb-6">Review your information and submit.</p>
            <form onSubmit={onSubmit}>
                <div className="flex justify-between">
                    <motion.button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Previous
                    </motion.button>
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default FormStep3;