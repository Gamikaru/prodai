import React from 'react';

const FormStep3 = ({ prevStep }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Confirmation</h2>
            <p>Review your information and submit.</p>
            <div className="flex justify-between mt-4">
                <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded">
                    Previous
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default FormStep3;