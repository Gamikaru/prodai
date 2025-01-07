// client/src/components/multistep-form/ProgressBar.test.jsx

import { render, screen } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
    test('renders progress bar with correct width', () => {
        render(<ProgressBar currentStep={2} totalSteps={4} />);
        const progressBarFill = screen.getByRole('progressbar').firstChild;

        expect(progressBarFill).toHaveStyle('width: 50%');
    });

    test('renders progress bar at 0% when on first step', () => {
        render(<ProgressBar currentStep={1} totalSteps={4} />);
        const progressBarFill = screen.getByRole('progressbar').firstChild;

        expect(progressBarFill).toHaveStyle('width: 25%');
    });

    test('renders progress bar at 100% when on last step', () => {
        render(<ProgressBar currentStep={4} totalSteps={4} />);
        const progressBarFill = screen.getByRole('progressbar').firstChild;

        expect(progressBarFill).toHaveStyle('width: 100%');
    });
});