import React, { useContext, useState } from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import Badge from './Badge';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import ProgressBar from './ProgressBar';

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { userProfile } = useContext(UserProfileContext);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FormStep1 nextStep={nextStep} />;
            case 2:
                return <FormStep2 nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <FormStep3 prevStep={prevStep} />;
            default:
                return <FormStep1 nextStep={nextStep} />;
        }
    };

    return (
        <div className="multi-step-form">
            <ProgressBar currentStep={currentStep} totalSteps={3} />
            {renderStep()}
            {currentStep === 3 && <Badge />}
        </div>
    );
};

export default MultiStepForm;