// client/src/components/multistep-form/FormStep2.test.jsx

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FormStep2 from './FormStep2';

describe('FormStep2 Component', () => {
    const mockNextStep = jest.fn();
    const mockPrevStep = jest.fn();
    const mockHandleChange = jest.fn();
    const mockValues = {
        preferredLanguage: '',
        timeZone: '',
    };

    test('renders form fields and navigation buttons', () => {
        render(
            <FormStep2
                nextStep={mockNextStep}
                prevStep={mockPrevStep}
                handleChange={mockHandleChange}
                values={mockValues}
            />
        );

        const languageSelect = screen.getByLabelText(/preferred language/i);
        const timeZoneSelect = screen.getByLabelText(/time zone/i);
        const previousButton = screen.getByRole('button', { name: /previous/i });
        const nextButton = screen.getByRole('button', { name: /next/i });

        expect(languageSelect).toBeInTheDocument();
        expect(timeZoneSelect).toBeInTheDocument();
        expect(previousButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    test('calls handleChange on input change', () => {
        render(
            <FormStep2
                nextStep={mockNextStep}
                prevStep={mockPrevStep}
                handleChange={mockHandleChange}
                values={mockValues}
            />
        );

        const languageSelect = screen.getByLabelText(/preferred language/i);
        const timeZoneSelect = screen.getByLabelText(/time zone/i);

        fireEvent.change(languageSelect, { target: { value: 'English' } });
        fireEvent.change(timeZoneSelect, { target: { value: 'UTC-5:00' } });

        expect(mockHandleChange).toHaveBeenCalledTimes(2);
    });

    test('calls nextStep on form submission', () => {
        render(
            <FormStep2
                nextStep={mockNextStep}
                prevStep={mockPrevStep}
                handleChange={mockHandleChange}
                values={mockValues}
            />
        );

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockNextStep).toHaveBeenCalledTimes(1);
    });

    test('calls prevStep on Previous button click', () => {
        render(
            <FormStep2
                nextStep={mockNextStep}
                prevStep={mockPrevStep}
                handleChange={mockHandleChange}
                values={mockValues}
            />
        );

        const previousButton = screen.getByRole('button', { name: /previous/i });
        fireEvent.click(previousButton);

        expect(mockPrevStep).toHaveBeenCalledTimes(1);
    });
});