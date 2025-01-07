import React from 'react';

const FormStep1 = ({ nextStep, handleChange, values }) => { // Added handleChange and values props

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        nextStep();
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Basic Information</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={values.firstName} // Changed from defaultValue to value
                        onChange={handleChange('firstName')} // Added onChange handler
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={values.lastName} // Changed from defaultValue to value
                        onChange={handleChange('lastName')} // Added onChange handler
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Next
                </button>
            </form>
        </div>
    );
};

export default FormStep1;