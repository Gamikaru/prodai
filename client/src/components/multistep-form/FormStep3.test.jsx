// client/src/components/multistep-form/FormStep3.test.jsx

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FormStep3 from './FormStep3';

describe('FormStep3 Component', () => {
    const mockSubmit = jest.fn();
    const mockPrevStep = jest.fn();

    test('renders confirmation message and navigation buttons', () => {
        render(
            <FormStep3
                prevStep={mockPrevStep}
                handleSubmit={mockSubmit}
                isSubmitting={false}
            />
        );

        const confirmationMessage = screen.getByText(/review your information and submit/i);
        const previousButton = screen.getByRole('button', { name: /previous/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });

        expect(confirmationMessage).toBeInTheDocument();
        expect(previousButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('calls handleSubmit on Submit button click', () => {
        render(
            <FormStep3
                prevStep={mockPrevStep}
                handleSubmit={mockSubmit}
                isSubmitting={false}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    test('calls prevStep on Previous button click', () => {
        render(
            <FormStep3
                prevStep={mockPrevStep}
                handleSubmit={mockSubmit}
                isSubmitting={false}
            />
        );

        const previousButton = screen.getByRole('button', { name: /previous/i });
        fireEvent.click(previousButton);

        expect(mockPrevStep).toHaveBeenCalledTimes(1);
    });

    test('disables Submit button when submitting', () => {
        render(
            <FormStep3
                prevStep={mockPrevStep}
                handleSubmit={mockSubmit}
                isSubmitting={true}
            />
        );

        const submitButton = screen.getByRole('button', { name: /submitting\.\.\./i });
        expect(submitButton).toBeDisabled();
    });
});