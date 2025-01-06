import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import PlanPage from './PlanPage';

describe('PlanPage', () => {
    test('renders PlanPage component', () => {
        render(<PlanPage token="dummy-token" />);
        const headingElement = screen.getByText(/your plans/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders form fields and submit button', () => {
        render(<PlanPage token="dummy-token" />);

        const titleInput = screen.getByPlaceholderText(/Title/i);
        const descriptionInput = screen.getByPlaceholderText(/Description/i);
        const submitButton = screen.getByRole('button', { name: /create plan/i });

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('handles form submission', () => {
        render(<PlanPage token="dummy-token" />);

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Plan' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Plan Description' } });
        fireEvent.click(screen.getByRole('button', { name: /create plan/i }));

        // Since axios is not mocked, we can't assert the actual API call
        // Instead, we can check if the form fields are cleared after submission
        expect(screen.getByPlaceholderText(/Title/i).value).toBe('');
        expect(screen.getByPlaceholderText(/Description/i).value).toBe('');
    });
});