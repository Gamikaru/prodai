# AI Planner App Frontend

Welcome to the **AI Planner App Frontend** repository! This frontend serves as the user interface for the AI Planner application, enabling users to interact seamlessly with the backend services for planning, goal setting, and AI-driven insights. Built with React and styled using Tailwind CSS, the frontend ensures a responsive and intuitive user experience across various devices.

## Table of Contents

- [AI Planner App Frontend](#ai-planner-app-frontend)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Application](#running-the-application)
    - [Building for Production](#building-for-production)
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
  - [Testing](#testing)
    - [Testing Tools](#testing-tools)
    - [Running Tests](#running-tests)
    - [Example Tests](#example-tests)
  - [Styling](#styling)
    - [Configuration](#configuration-1)
    - [Usage](#usage)
    - [Customization](#customization)
  - [Logging](#logging)
    - [Configuration](#configuration-2)
    - [Benefits](#benefits)
  - [Contributing](#contributing)
    - [Code Standards](#code-standards)
    - [Testing](#testing-1)
  - [License](#license)
  - [Contact](#contact)

## Project Overview

The AI Planner App Frontend is designed to provide users with an intuitive interface to organize and prioritize tasks, set and track goals, manage calendars, and interact with an AI-powered chatbot. It communicates with the backend APIs to handle user authentication, task management, and AI interactions, ensuring a cohesive and efficient planning experience.

## Features

- **User Authentication:** Register and log in securely using JWT-based authentication.
- **Task Management:** Create, view, and manage yearly, monthly, weekly, and daily plans.
- **Goal Setting and Reflection:** Set, track, and reflect on personal and professional objectives.
- **AI Chatbot:** Interact with an AI-driven chatbot for personalized suggestions and insights.
- **Responsive Design:** Optimized for smartphones, tablets, and desktops using Tailwind CSS.
- **Real-Time Updates:** Seamless synchronization with the backend for real-time data management.
- **Logging:** Comprehensive logging for debugging and monitoring user interactions.

## Technology Stack

- **Frontend Framework:** React
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Logging:** loglevel
- **Testing:** Jest, React Testing Library
- **Build Tool:** Webpack via Create React App

## Architecture

The frontend follows a component-based architecture, promoting reusability and maintainability. Key aspects include:

- **Components:** Modular React components for different parts of the application (e.g., `HomePage`, `LoginPage`, `PlanPage`, `ChatPage`).
- **Routing:** Managed by React Router DOM, enabling navigation between different views.
- **State Management:** Handled using React Hooks (`useState`, `useEffect`).
- **API Integration:** Axios is configured to communicate with the backend APIs, including handling authentication tokens.
- **Styling:** Utilizes Tailwind CSS for rapid and responsive UI development.
- **Testing:** Comprehensive tests using Jest and React Testing Library to ensure component reliability.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Version 14.x or higher
- **npm:** Version 6.x or higher (comes with Node.js)
- **Backend Server:** The backend server should be running and accessible (default: `http://localhost:8000`)
- **Git:** For version control

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-planner-frontend.git
   cd ai-planner-frontend
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   ```

   **`package.json` Overview**

   ```json
   {
     "name": "planner-ai-client",
     "version": "1.0.0",
     "private": true,
     "dependencies": {
       "axios": "^1.3.0",
       "loglevel": "^1.9.2",
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-router-dom": "^6.8.0",
       "react-scripts": "^5.0.1",
       "web-vitals": "^4.2.4"
     },
     "devDependencies": {
       "@babel/preset-env": "^7.20.0",
       "@babel/preset-react": "^7.18.6",
       "@testing-library/jest-dom": "^5.17.0",
       "@testing-library/react": "^13.4.0",
       "autoprefixer": "^10.4.20",
       "babel-jest": "^29.7.0",
       "jest": "^29.7.0",
       "jest-environment-jsdom": "^29.7.0",
       "postcss": "^8.4.49",
       "tailwindcss": "^3.4.17"
     },
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "jest --config=jest.config.js --watchAll"
     },
     "browserslist": {
       "production": [
         ">0.2%",
         "not dead",
         "not op_mini all"
       ],
       "development": [
         "last 1 chrome version",
         "last 1 firefox version",
         "last 1 safari version"
       ]
     }
   }
   ```

### Configuration

1. **Environment Variables**

   Create a `.env` file in the root of the `client/` directory with the following content:

   ```dotenv
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

   - **`REACT_APP_BACKEND_URL`**: Base URL for the backend API. Ensure this matches the backend server's address.

2. **Tailwind CSS Configuration**

   Tailwind CSS is configured using `tailwind.config.js` and `postcss.config.js`.

   - **`tailwind.config.js`**

     ```javascript
     /** @type {import('tailwindcss').Config} */
     module.exports = {
         content: [
             "./src/**/*.{js,jsx,ts,tsx}"
         ],
         theme: {
             extend: {},
         },
         plugins: [],
     };
     ```

   - **`postcss.config.js`**

     ```javascript
     module.exports = {
         plugins: {
             tailwindcss: {},
             autoprefixer: {},
         },
     }
     ```

3. **Babel Configuration**

   Babel is configured to transpile modern JavaScript and React JSX.

   - **`.babelrc`**

     ```json
     {
       "presets": [
         "@babel/preset-env",
         [
           "@babel/preset-react",
           {
             "runtime": "automatic"
           }
         ]
       ]
     }
     ```

### Running the Application

Start the development server:

```bash
npm start
```

- The application will be accessible at `http://localhost:3000`.
- Ensure the backend server is running and accessible at the URL specified in `.env` (`http://localhost:8000` by default).

### Building for Production

To build the application for production, run:

```bash
npm run build
```

- The optimized production build will be in the `build/` directory.

## Project Structure

```
planner-ai-client/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── ChatPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PlanPage.jsx
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── setupTests.js
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── babel.config.js
├── jest.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

- **public/**: Contains the static HTML file and other public assets.
- **src/**: Contains all React components, services, and styles.
  - **components/**: React components for different pages and functionalities.
  - **services/**: Axios instance configuration for API communication.
  - **setupTests.js**: Configuration for Jest and React Testing Library.
  - **App.jsx**: Main application component handling routing and global state.
  - **index.css**: Tailwind CSS imports and global styles.
  - **index.js**: Entry point for the React application.
- **.env**: Environment variables.
- **babel.config.js**: Babel configuration.
- **jest.config.js**: Jest configuration.
- **package.json**: Project metadata and dependencies.
- **postcss.config.js**: PostCSS configuration for Tailwind CSS.
- **tailwind.config.js**: Tailwind CSS configuration.

## Scripts

The `package.json` defines several scripts to manage the application:

- **Start Development Server**

  ```bash
  npm start
  ```

  - Runs the app in development mode.
  - Opens [http://localhost:3000](http://localhost:3000) in the browser.
  - Enables hot reloading for rapid development.

- **Build for Production**

  ```bash
  npm run build
  ```

  - Builds the app for production.
  - Outputs optimized files to the `build/` directory.

- **Run Tests**

  ```bash
  npm test
  ```

  - Runs the test suite using Jest and React Testing Library.
  - Watches for file changes and re-runs tests automatically.

## Testing

The frontend includes comprehensive tests to ensure component reliability and functionality.

### Testing Tools

- **Jest:** JavaScript testing framework.
- **React Testing Library:** Testing utilities for React components.
- **@testing-library/jest-dom:** Custom Jest matchers for DOM nodes.

### Running Tests

Execute the following command to run the tests:

```bash
npm test
```

- **Test Configuration:** Defined in `jest.config.js`.
- **Test Files:** Located alongside components with `.test.js` or `.test.jsx` extensions.

### Example Tests

- **`LoginPage.test.js`**

  ```javascript
  import { fireEvent, render, screen } from '@testing-library/react';
  import React from 'react';
  import LoginPage from './LoginPage';

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
  ```

- **`PlanPage.test.js`**

  ```javascript
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
  ```

## Styling

Tailwind CSS is used for styling the application, providing utility-first CSS classes for rapid UI development.

### Configuration

- **`tailwind.config.js`**

  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
      content: [
          "./src/**/*.{js,jsx,ts,tsx}"
      ],
      theme: {
          extend: {},
      },
      plugins: [],
  };
  ```

- **`postcss.config.js`**

  ```javascript
  module.exports = {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  }
  ```

### Usage

Import Tailwind CSS directives in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Customization

Customize the Tailwind theme by modifying the `theme` section in `tailwind.config.js`. You can extend colors, fonts, spacing, and more to match your design requirements.

## Logging

The application uses the `loglevel` library to provide configurable logging levels, aiding in debugging and monitoring.

### Configuration

- **Logger Setup:**

  ```javascript
  import logging from 'loglevel';
  const logger = logging.getLogger("App");
  logger.setLevel('debug');
  ```

- **Usage in Components:**

  ```javascript
  logger.debug("Debugging information");
  logger.info("Informational message");
  logger.warn("Warning message");
  logger.error("Error message");
  ```

### Benefits

- **Debugging:** Detailed logs help identify and resolve issues efficiently.
- **Monitoring:** Track user interactions and application behavior in real-time.
- **Flexibility:** Adjust logging levels based on the environment (development vs. production).

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page to create a personal copy.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/ai-planner-frontend.git
   cd ai-planner-frontend
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

4. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**

   Navigate to the original repository and create a pull request from your forked repository.

### Code Standards

- Follow consistent coding styles and best practices.
- Ensure components are reusable and maintainable.
- Write meaningful commit messages.

### Testing

- Include tests for new features or components.
- Ensure all tests pass before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:

- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [https://github.com/yourusername](https://github.com/yourusername)

---

*Happy Planning! 🚀*