// client/src/components/multistep-form/ProgressBar.jsx

import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;

    return (
        <div className="progress-bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin="0" aria-valuemax={totalSteps}>
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;