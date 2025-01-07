import { AnimatePresence, motion } from 'framer-motion';
import logging from 'loglevel';
import React, { useContext, useState } from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import api from '../../services/api';
import Badge from './Badge';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import ProgressBar from './ProgressBar';

const logger = logging.getLogger("MultiStepForm");
logger.setLevel('debug');

const MultiStepForm = ({ token }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const { userProfile, setUserProfile } = useContext(UserProfileContext);
    const [formData, setFormData] = useState({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        preferredLanguage: '',
        timeZone: '',
        // Add other questionnaire fields here
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [error, setError] = useState(null);

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await api.post('/onboarding/submit', {
                responses: formData
            }, {
                headers: {
                    'token': token || localStorage.getItem('token')
                }
            });
            logger.info("Questionnaire submitted successfully:", response.data);
            setSubmissionSuccess(true);
            setUserProfile(formData);
        } catch (err) {
            logger.error("Error submitting questionnaire:", err);
            setError(err.response?.data?.detail || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FormStep1 nextStep={nextStep} handleChange={handleChange} values={formData} />;
            case 2:
                return <FormStep2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 3:
                return <FormStep3 prevStep={prevStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />;
            default:
                return <FormStep1 nextStep={nextStep} handleChange={handleChange} values={formData} />;
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Onboarding Form</h2>
            <ProgressBar currentStep={currentStep} totalSteps={3} />
            <AnimatePresence mode="wait">
                {submissionSuccess ? (
                    <Badge key="badge" />
                ) : (
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderStep()}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MultiStepForm;