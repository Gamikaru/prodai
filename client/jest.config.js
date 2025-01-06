// jest.config.js
module.exports = {
    testEnvironment: 'jest-environment-jsdom', // or "jsdom"
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx)']
};
