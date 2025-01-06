# AI Planner App

Welcome to the **AI Planner App** repository! This project combines both the frontend and backend components to provide a comprehensive solution for organizing, prioritizing tasks, setting goals, managing schedules, and interacting with an AI-driven chatbot. Whether you're looking to manage your daily tasks or set long-term professional objectives, the AI Planner App is designed to help you achieve your goals efficiently and effortlessly.

## Table of Contents

- [AI Planner App](#ai-planner-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Architecture](#architecture)
    - [Backend Architecture](#backend-architecture)
    - [Frontend Architecture](#frontend-architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Backend Installation](#backend-installation)
      - [Frontend Installation](#frontend-installation)
    - [Configuration](#configuration)
      - [Backend Configuration](#backend-configuration)
      - [Frontend Configuration](#frontend-configuration)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
      - [Running the Backend Server](#running-the-backend-server)
      - [Running the Frontend Application](#running-the-frontend-application)
    - [Building for Production](#building-for-production)
      - [Building the Frontend](#building-the-frontend)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
      - [Register](#register)
      - [Login](#login)
    - [Plans](#plans)
      - [Create Plan](#create-plan)
      - [Get Plans](#get-plans)
    - [AI Chat](#ai-chat)
      - [Chat with AI](#chat-with-ai)
  - [Project Structure](#project-structure)
    - [Backend Project Structure](#backend-project-structure)
    - [Frontend Project Structure](#frontend-project-structure)
  - [Scripts](#scripts)
    - [Backend Scripts](#backend-scripts)
    - [Frontend Scripts](#frontend-scripts)
  - [Testing](#testing)
    - [Backend Testing](#backend-testing)
    - [Frontend Testing](#frontend-testing)
      - [Testing Tools](#testing-tools)
      - [Running Tests](#running-tests)
      - [Example Tests](#example-tests)
  - [Styling](#styling)
    - [Tailwind CSS Configuration](#tailwind-css-configuration)
    - [Usage](#usage)
    - [Customization](#customization)
  - [Logging](#logging)
    - [Backend Logging](#backend-logging)
    - [Frontend Logging](#frontend-logging)
      - [Logger Setup](#logger-setup)
      - [Benefits](#benefits)
  - [Contributing](#contributing)
    - [General Guidelines](#general-guidelines)
    - [Backend Contributions](#backend-contributions)
    - [Frontend Contributions](#frontend-contributions)
  - [License](#license)
  - [Contact](#contact)

## Project Overview

The **AI Planner App** is a full-stack application designed to assist users in organizing and prioritizing tasks, setting and tracking goals, managing calendars, and interacting with an AI-powered chatbot for personalized suggestions and insights. The application caters to both long-term and short-term planning needs, making it an indispensable tool for personal and professional development.

## Features

- **Yearly, Monthly, Weekly, and Daily Planning:** Organize and prioritize tasks across various timeframes.
- **Goal Setting and Reflection:** Set, track, and reflect on personal and professional objectives with AI-driven recommendations.
- **Calendar and Schedule Management:** Integrate calendars, receive automated reminders, and utilize smart scheduling.
- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **AI Integration:** Natural Language Processing (NLP) powered chatbot for personalized suggestions and interactions.
- **Cross-Platform Compatibility:** Optimized for smartphones, tablets, and desktops.
- **Responsive Design:** Ensures an intuitive and seamless user experience across all devices.
- **Logging:** Comprehensive logging for debugging and monitoring user interactions.

## Technology Stack

### Backend

- **Programming Language:** Python
- **Framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** OpenAI GPT API
- **Other Libraries:** Pydantic, Uvicorn, Passlib, PyJWT, Python-dotenv

### Frontend

- **Frontend Framework:** React
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Logging:** loglevel
- **Testing:** Jest, React Testing Library
- **Build Tool:** Webpack via Create React App

## Architecture

### Backend Architecture

The backend follows a modular architecture with a clear separation of concerns, ensuring scalability and maintainability.

- **Models:** Define database schemas using SQLAlchemy ORM.
- **Schemas:** Handle data validation and serialization using Pydantic models.
- **Routers:** Manage API endpoints for authentication, plan management, and AI interactions.
- **Database:** Configure and manage database connections and sessions.
- **Configuration:** Load and manage environment variables and application settings.

### Frontend Architecture

The frontend adopts a component-based architecture, promoting reusability and ease of maintenance.

- **Components:** Modular React components for different parts of the application (e.g., `HomePage`, `LoginPage`, `PlanPage`, `ChatPage`).
- **Routing:** Managed by React Router DOM to navigate between different views.
- **State Management:** Utilizes React Hooks (`useState`, `useEffect`) for managing state.
- **API Integration:** Axios is configured to communicate with backend APIs, handling authentication tokens.
- **Styling:** Tailwind CSS facilitates rapid and responsive UI development.
- **Testing:** Comprehensive tests using Jest and React Testing Library ensure component reliability.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Backend:**
  - **Python 3.9+**
  - **PostgreSQL Database**
  - **Git**
  - **Virtual Environment Tool** (e.g., `venv`, `pipenv`, `conda`)

- **Frontend:**
  - **Node.js:** Version 14.x or higher
  - **npm:** Version 6.x or higher (comes with Node.js)
  - **Git**

### Installation

#### Backend Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-planner-app.git
   cd ai-planner-app/backend
   ```

2. **Create and Activate a Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

   **`requirements.txt`**

   ```plaintext
   fastapi==0.95.2
   uvicorn==0.22.0
   SQLAlchemy==2.0.9
   psycopg2-binary==2.9.6
   python-dotenv==1.0.0
   passlib==1.7.4
   pyjwt==2.6.0
   openai==0.27.2
   ```

#### Frontend Installation

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

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

#### Backend Configuration

1. **Environment Variables**

   Create a `.env` file in the `backend/` directory with the following content:

   ```dotenv
   DATABASE_URL=postgresql://postgres:1234@localhost:5432/mydb
   JWT_SECRET=my_jwt_secret_key
   JWT_ALGORITHM=HS256
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   - **`DATABASE_URL`**: Connection string for your PostgreSQL database.
   - **`JWT_SECRET`**: Secret key for JWT token encoding.
   - **`JWT_ALGORITHM`**: Algorithm used for JWT.
   - **`OPENAI_API_KEY`**: Your OpenAI API key for AI functionalities.

#### Frontend Configuration

1. **Environment Variables**

   Create a `.env` file in the `frontend/` directory with the following content:

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

### Database Setup

1. **Ensure PostgreSQL is Running**

   Make sure your PostgreSQL server is up and the database specified in `DATABASE_URL` exists.

2. **Initialize Database Tables**

   The tables will be created automatically when you run the backend server for the first time. Alternatively, you can manually initialize them:

   ```bash
   python server/models.py
   ```

### Running the Application

#### Running the Backend Server

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Start the FastAPI Server Using Uvicorn**

   ```bash
   uvicorn server.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   - **`--reload`**: Enables auto-reload on code changes (useful during development).

   The server will be accessible at `http://localhost:8000`.

#### Running the Frontend Application

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Start the Development Server**

   ```bash
   npm start
   ```

   - The application will be accessible at `http://localhost:3000`.
   - Ensure the backend server is running and accessible at the URL specified in `.env` (`http://localhost:8000` by default).

### Building for Production

#### Building the Frontend

To build the application for production, run:

```bash
npm run build
```

- The optimized production build will be in the `frontend/build/` directory.

## API Documentation

FastAPI automatically generates interactive API documentation. Access it at:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Authentication

#### Register

- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Response:**

  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "is_active": true
  }
  ```

#### Login

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticate a user and receive a JWT token.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Response:**

  ```json
  {
    "access_token": "your_jwt_token",
    "token_type": "bearer"
  }
  ```

### Plans

#### Create Plan

- **Endpoint:** `POST /plans/`
- **Description:** Create a new plan/task.
- **Headers:**
  - `token`: `your_jwt_token`
- **Request Body:**

  ```json
  {
    "title": "Complete Project",
    "description": "Finish the AI Planner project by end of the month.",
    "due_date": "2025-01-31T23:59:59Z"
  }
  ```

- **Response:**

  ```json
  {
    "id": 1,
    "title": "Complete Project",
    "description": "Finish the AI Planner project by end of the month.",
    "created_at": "2025-01-05T12:34:56Z",
    "due_date": "2025-01-31T23:59:59Z"
  }
  ```

#### Get Plans

- **Endpoint:** `GET /plans/`
- **Description:** Retrieve all plans for the authenticated user.
- **Headers:**
  - `token`: `your_jwt_token`
- **Response:**

  ```json
  [
    {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the AI Planner project by end of the month.",
      "created_at": "2025-01-05T12:34:56Z",
      "due_date": "2025-01-31T23:59:59Z"
    },
    {
      "id": 2,
      "title": "Weekly Review",
      "description": "Review weekly progress every Friday.",
      "created_at": "2025-01-05T13:00:00Z",
      "due_date": null
    }
  ]
  ```

### AI Chat

#### Chat with AI

- **Endpoint:** `POST /ai/chat`
- **Description:** Interact with the AI chatbot for personalized suggestions and insights.
- **Request Body:**

  ```json
  {
    "prompt": "Help me set a goal for improving my productivity."
  }
  ```

- **Response:**

  ```json
  {
    "reply": "To improve your productivity, consider setting specific, measurable goals such as completing tasks within designated time blocks, minimizing distractions, and regularly reviewing your progress to make necessary adjustments."
  }
  ```

## Project Structure

### Backend Project Structure

```
ai-planner-app/
├── backend/
│   ├── server/
│   │   ├── routers/
│   │   │   ├── ai.py
│   │   │   ├── auth.py
│   │   │   └── plans.py
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── .env
│   ├── requirements.txt
│   └── README.md
```

- **routers/**: Contains API route handlers.
- **config.py**: Handles environment variables and configuration settings.
- **database.py**: Database connection and session management.
- **main.py**: FastAPI application initialization and server configuration.
- **models.py**: SQLAlchemy ORM models defining database tables.
- **schemas.py**: Pydantic models for request and response validation.
- **.env**: Environment variables (should be kept secret and not committed to version control).
- **requirements.txt**: Python dependencies.

### Frontend Project Structure

```
ai-planner-app/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PlanPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── setupTests.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── .gitignore
│   ├── babel.config.js
│   ├── jest.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── README.md
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

### Backend Scripts

**`backend/requirements.txt`**

```plaintext
fastapi==0.95.2
uvicorn==0.22.0
SQLAlchemy==2.0.9
psycopg2-binary==2.9.6
python-dotenv==1.0.0
passlib==1.7.4
pyjwt==2.6.0
openai==0.27.2
```

- **Start Server**

  ```bash
  uvicorn server.main:app --host 0.0.0.0 --port 8000 --reload
  ```

  - Runs the FastAPI server with auto-reload enabled.

### Frontend Scripts

**`frontend/package.json`**

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest --config=jest.config.js --watchAll"
  }
}
```

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
  - Outputs optimized files to the `frontend/build/` directory.

- **Run Tests**

  ```bash
  npm test
  ```

  - Runs the test suite using Jest and React Testing Library.
  - Watches for file changes and re-runs tests automatically.

## Testing

### Backend Testing

*Currently, the backend does not include automated tests. Future updates will incorporate comprehensive testing using frameworks such as pytest.*

### Frontend Testing

The frontend includes comprehensive tests to ensure component reliability and functionality.

#### Testing Tools

- **Jest:** JavaScript testing framework.
- **React Testing Library:** Testing utilities for React components.
- **@testing-library/jest-dom:** Custom Jest matchers for DOM nodes.

#### Running Tests

Execute the following command to run the tests:

```bash
npm test
```

- **Test Configuration:** Defined in `frontend/jest.config.js`.
- **Test Files:** Located alongside components with `.test.js` or `.test.jsx` extensions.

#### Example Tests

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

Tailwind CSS is used for styling the frontend application, providing utility-first CSS classes for rapid and responsive UI development.

### Tailwind CSS Configuration

- **`frontend/tailwind.config.js`**

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

- **`frontend/postcss.config.js`**

  ```javascript
  module.exports = {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  }
  ```

### Usage

Import Tailwind CSS directives in `frontend/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Customization

Customize the Tailwind theme by modifying the `theme` section in `tailwind.config.js`. You can extend colors, fonts, spacing, and more to match your design requirements.

## Logging

Logging is implemented in both the backend and frontend to aid in debugging and monitoring application behavior.

### Backend Logging

The backend uses Python's built-in `logging` module to provide detailed logs for debugging and monitoring.

- **Log Levels:**
  - **Debug Logs:** Detailed information, typically of interest only when diagnosing problems.
  - **Info Logs:** Confirmation that things are working as expected.
  - **Warning Logs:** Indicate something unexpected happened or indicative of some problem in the near future.
  - **Error Logs:** Due to a more serious problem, the software has not been able to perform some function.

- **Log Configuration:**
  - Configured in `backend/server/main.py` and `backend/server/config.py`.
  - Logs are output to the console with timestamps, log levels, and messages.

### Frontend Logging

The frontend uses the `loglevel` library to provide configurable logging levels, aiding in debugging and monitoring.

#### Logger Setup

- **Example Setup in `frontend/src/App.jsx`:**

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

#### Benefits

- **Debugging:** Detailed logs help identify and resolve issues efficiently.
- **Monitoring:** Track user interactions and application behavior in real-time.
- **Flexibility:** Adjust logging levels based on the environment (development vs. production).

## Contributing

Contributions are welcome! This project follows a collaborative approach to improve and expand its features. Please follow the guidelines below to contribute effectively.

### General Guidelines

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page to create a personal copy.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/ai-planner-app.git
   cd ai-planner-app
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

### Backend Contributions

- **Code Standards:**
  - Follow Python best practices and PEP 8 guidelines.
  - Ensure clear and concise documentation for new endpoints and features.
  - Write unit and integration tests for new functionalities.

- **Testing:**
  - Incorporate tests using frameworks like `pytest`.
  - Ensure all tests pass before submitting a pull request.

### Frontend Contributions

- **Code Standards:**
  - Adhere to React best practices and maintain consistent coding styles.
  - Ensure components are reusable and maintainable.
  - Write meaningful commit messages.

- **Testing:**
  - Include tests for new features or components using Jest and React Testing Library.
  - Ensure all tests pass before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:

- **Name:** Gavriel Rudolph
- **Email:** [gavriel@gamikaru.dev](mailto:gavriel@gamikaru.dev)
- **GitHub:** [https://github.com/Gamikaru](https://github.com/Gamikaru)
- **LinkedIn:** [https://linkedin.com/in/gavriel-rudolph](https://linkedin.com/in/gavriel-rudolph)
- **Website:** [Gamikaru.com](https://Gamikaru.com)

---

*Happy Planning! 🚀*