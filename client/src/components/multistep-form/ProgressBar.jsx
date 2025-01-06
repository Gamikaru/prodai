import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;

    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;