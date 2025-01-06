import React from 'react';

const FormStep2 = ({ nextStep, prevStep }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 2: Additional Information</h2>
            <form onSubmit={nextStep}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded">
                        Previous
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormStep2;