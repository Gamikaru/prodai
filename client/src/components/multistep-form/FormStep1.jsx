import React, { useContext } from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';

const FormStep1 = ({ nextStep }) => {
    const { userProfile } = useContext(UserProfileContext);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Basic Information</h2>
            <form onSubmit={nextStep}>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        defaultValue={userProfile.firstName}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        defaultValue={userProfile.lastName}
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