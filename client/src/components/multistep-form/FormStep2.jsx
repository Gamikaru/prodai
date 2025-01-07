import { motion } from 'framer-motion';
import React from 'react';

const FormStep2 = ({ nextStep, prevStep, handleChange, values }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    const timeZones = [
        { label: "Eastern Time (ET)", value: "UTC-05:00" },
        { label: "Central Time (CT)", value: "UTC-06:00" },
        { label: "Mountain Time (MT)", value: "UTC-07:00" },
        { label: "Pacific Time (PT)", value: "UTC-08:00" },
        { label: "Greenwich Mean Time (GMT)", value: "UTC+00:00" },
        { label: "Central European Time (CET)", value: "UTC+01:00" },
        { label: "Eastern European Time (EET)", value: "UTC+02:00" },
        { label: "Japan Standard Time (JST)", value: "UTC+09:00" },
        { label: "Australian Eastern Time (AET)", value: "UTC+10:00" },
        // Add more time zones as needed
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold mb-6">Step 2: Additional Information</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Preferred Language</label>
                    <input
                        type="text"
                        name="preferredLanguage"
                        value={values.preferredLanguage}
                        onChange={handleChange('preferredLanguage')}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time Zone</label>
                    <select
                        name="timeZone"
                        value={values.timeZone}
                        onChange={handleChange('timeZone')}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="" disabled>Select your time zone</option>
                        {timeZones.map((zone) => (
                            <option key={zone.value} value={zone.value}>
                                {zone.label}
                            </option>
                        ))}
                    </select>
                </div>
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
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Next
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default FormStep2;