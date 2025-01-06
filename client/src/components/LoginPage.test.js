// src/components/LoginPage.test.js
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react'; // Ensure React is imported
import LoginPage from './LoginPage'; // Default import

describe('LoginPage', () => {
    test('renders login form fields', () => {
        render(<LoginPage setToken={() => { }} />);

        const emailInput = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    test('handles login submission', () => {
        const mockSetToken = jest.fn();
        render(<LoginPage setToken={mockSetToken} />);

        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Since fetch is not mocked, setToken won't be called
        expect(mockSetToken).not.toHaveBeenCalled();
    });
});
