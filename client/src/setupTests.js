// client/setupTests.js
import '@testing-library/jest-dom';

// client/setupTests.js

// Mock localStorage
beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'dummy-token');
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
});