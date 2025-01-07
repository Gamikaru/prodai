// client/src/components/multistep-form/Badge.test.jsx

import { render, screen } from '@testing-library/react';
import React from 'react';
import Badge from './Badge';

describe('Badge Component', () => {
    test('renders congratulatory message', () => {
        render(<Badge />);
        const headingElement = screen.getByText(/congratulations!/i);
        const messageElement = screen.getByText(/you have completed the form and earned a badge!/i);

        expect(headingElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
    });

    test('has correct class names for styling', () => {
        render(<Badge />);
        const badgeElement = screen.getByText(/congratulations!/i).parentElement;

        expect(badgeElement).toHaveClass('badge');
    });
});