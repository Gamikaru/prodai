// client/src/components/multistep-form/FormStep1.test.jsx

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import FormStep1 from './FormStep1';

describe('FormStep1 Component', () => {
    const mockNextStep = jest.fn();
    const mockUserProfile = {
        firstName: 'John',
        lastName: 'Doe',
    };

    test('renders form fields and Next button', () => {
        render(
            <UserProfileContext.Provider value={{ userProfile: mockUserProfile }}>
                <FormStep1 nextStep={mockNextStep} />
            </UserProfileContext.Provider>
        );

        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const nextButton = screen.getByRole('button', { name: /next/i });

        expect(firstNameInput).toBeInTheDocument();
        expect(firstNameInput).toHaveValue('John');

        expect(lastNameInput).toBeInTheDocument();
        expect(lastNameInput).toHaveValue('Doe');

        expect(nextButton).toBeInTheDocument();
    });

    test('calls nextStep on form submission', () => {
        render(
            <UserProfileContext.Provider value={{ userProfile: mockUserProfile }}>
                <FormStep1 nextStep={mockNextStep} />
            </UserProfileContext.Provider>
        );

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockNextStep).toHaveBeenCalledTimes(1);
    });
});