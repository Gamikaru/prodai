import React from 'react';

const FormStep2 = ({ nextStep, prevStep, handleChange, values }) => {
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
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
        <div>
            <h2 className="text-xl font-bold mb-4">Step 2: Additional Information</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        className="border p-2 rounded w-full"
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
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time Zone</label>
                    <select
                        name="timeZone"
                        value={values.timeZone}
                        onChange={handleChange('timeZone')}
                        className="border p-2 rounded w-full"
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
