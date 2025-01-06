// src/components/HomePage.test.js
import { render, screen } from '@testing-library/react';
import React from 'react'; // Ensure React is imported
import HomePage from './HomePage'; // Default import

test('renders the welcome message', () => {
    render(<HomePage />);
    const headingElement = screen.getByText(/Welcome to the AI Planner!/i);
    expect(headingElement).toBeInTheDocument();
});
