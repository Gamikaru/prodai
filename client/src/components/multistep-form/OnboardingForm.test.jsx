// client/src/components/multistep-form/OnboardingForm.test.jsx

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import api from '../../services/api';
import OnboardingForm from './OnboardingForm';

// Mock the API module
jest.mock('../../services/api');

describe('OnboardingForm Component', () => {
    const mockSetUserProfile = jest.fn();

    const renderComponent = () => {
        render(
            <UserProfileContext.Provider value={{ userProfile: {}, setUserProfile: mockSetUserProfile }}>
                <OnboardingForm />
            </UserProfileContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders first step correctly', () => {
        renderComponent();

        const heading = screen.getByText(/onboarding form/i);
        const stepHeading = screen.getByText(/step 1: basic information/i);
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const nextButton = screen.getByRole('button', { name: /next/i });

        expect(heading).toBeInTheDocument();
        expect(stepHeading).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    test('navigates to next step on first step submission', () => {
        renderComponent();

        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const nextButton = screen.getByRole('button', { name: /next/i });

        fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
        fireEvent.click(nextButton);

        const step2Heading = screen.getByText(/step 2: additional information/i);
        expect(step2Heading).toBeInTheDocument();
    });

    test('navigates back to previous step', () => {
        renderComponent();

        // Navigate to Step 2
        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);

        // Now on Step 2
        const step2Heading = screen.getByText(/step 2: additional information/i);
        expect(step2Heading).toBeInTheDocument();

        // Click Previous
        const previousButton = screen.getByRole('button', { name: /previous/i });
        fireEvent.click(previousButton);

        // Should be back to Step 1
        const step1Heading = screen.getByText(/step 1: basic information/i);
        expect(step1Heading).toBeInTheDocument();
    });

    test('submits the form and displays badge on successful submission', async () => {
        api.post.mockResolvedValueOnce({
            data: {
                id: 1,
                user_id: 1,
                responses: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane.smith@example.com',
                },
                created_at: '2025-01-06T18:32:30Z',
            },
        });

        renderComponent();

        // Step 1
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 2
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.smith@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 3
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Wait for the badge to appear
        await waitFor(() => {
            const badgeHeading = screen.getByText(/congratulations!/i);
            expect(badgeHeading).toBeInTheDocument();
        });

        // Verify API call
        expect(api.post).toHaveBeenCalledWith(
            '/onboarding/submit',
            {
                responses: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane.smith@example.com',
                },
            },
            {
                headers: {
                    token: null, // since localStorage.getItem('token') is not set in the test environment
                },
            }
        );

        // Verify user profile update
        expect(mockSetUserProfile).toHaveBeenCalledWith({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
        });
    });

    test('displays error message on submission failure', async () => {
        api.post.mockRejectedValueOnce({
            response: {
                data: {
                    detail: 'Internal server error',
                },
            },
        });

        renderComponent();

        // Step 1
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 2
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.smith@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 3
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorMessage = screen.getByText(/internal server error/i);
            expect(errorMessage).toBeInTheDocument();
        });

        // Verify API call
        expect(api.post).toHaveBeenCalledWith(
            '/onboarding/submit',
            {
                responses: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane.smith@example.com',
                },
            },
            {
                headers: {
                    token: null, // since localStorage.getItem('token') is not set in the test environment
                },
            }
        );

        // Verify user profile update was not called
        expect(mockSetUserProfile).not.toHaveBeenCalled();
    });
});