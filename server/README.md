# AI Planner App Backend

Welcome to the **AI Planner App** backend repository! This backend serves as the core of the AI Planner application, providing robust APIs for user authentication, task management, and AI-driven insights to help users organize and achieve their personal and professional goals.

## Table of Contents

- [AI Planner App Backend](#ai-planner-app-backend)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Database Setup](#database-setup)
    - [Running the Server](#running-the-server)
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
  - [Logging](#logging)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Project Overview

The AI Planner App backend is designed to help users organize and prioritize tasks for both long-term and short-term goals. Leveraging AI-driven insights, it enables users to set, track, and reflect on their personal and professional objectives seamlessly.

## Features

- **Yearly, Monthly, Weekly, and Daily Planning:** Organize and prioritize tasks across various timeframes.
- **Goal Setting and Reflection:** Set, track, and reflect on objectives with AI-driven recommendations.
- **Calendar and Schedule Management:** Integrate calendars, receive automated reminders, and utilize smart scheduling.
- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **AI Integration:** Natural Language Processing (NLP) powered chatbot for personalized suggestions and interactions.
- **Cross-Platform Compatibility:** Optimized for smartphones, tablets, and desktops.

## Technology Stack

- **Backend Framework:** Python, FastAPI
- **Frontend Framework:** React (to be integrated later)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** OpenAI GPT API
- **Other Libraries:** Pydantic, Uvicorn, Passlib, PyJWT, Python-dotenv

## Architecture

The backend follows a modular architecture with clear separation of concerns:

- **Models:** Database models defined using SQLAlchemy.
- **Schemas:** Data validation and serialization using Pydantic.
- **Routers:** API endpoints for authentication, plans management, and AI interactions.
- **Database:** Configuration and session management.
- **Configuration:** Environment variables and settings management.

## Getting Started

### Prerequisites

- **Python 3.9+**
- **PostgreSQL Database**
- **Git**
- **Virtual Environment Tool** (e.g., `venv`, `pipenv`, `conda`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-planner-backend.git
   cd ai-planner-backend/server
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

### Configuration

1. **Environment Variables**

   Create a `.env` file in the `server/` directory with the following content:

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

### Database Setup

1. **Ensure PostgreSQL is Running**

   Make sure your PostgreSQL server is up and the database specified in `DATABASE_URL` exists.

2. **Initialize Database Tables**

   The tables will be created automatically when you run the server for the first time. Alternatively, you can manually initialize them:

   ```bash
   python server/models.py
   ```

### Running the Server

Start the FastAPI server using Uvicorn:

```bash
uvicorn server.main:app --host 0.0.0.0 --port 8000 --reload
```

- **`--reload`**: Enables auto-reload on code changes (useful during development).

The server will be accessible at `http://localhost:8000`.

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

```
ai-planner-backend/
├── server/
│   ├── routers/
│   │   ├── ai.py
│   │   ├── auth.py
│   │   └── plans.py
│   ├── __init__.py
│   ├── config.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
├── .env
├── requirements.txt
└── README.md
```

- **routers/**: Contains API route handlers.
- **config.py**: Handles environment variables and configuration settings.
- **database.py**: Database connection and session management.
- **main.py**: FastAPI application initialization and server configuration.
- **models.py**: SQLAlchemy ORM models defining database tables.
- **schemas.py**: Pydantic models for request and response validation.
- **.env**: Environment variables (should be kept secret and not committed to version control).
- **requirements.txt**: Python dependencies.

## Logging

The application uses Python's built-in `logging` module to provide detailed logs for debugging and monitoring. Logs include:

- **Debug Logs:** Detailed information, typically of interest only when diagnosing problems.
- **Info Logs:** Confirmation that things are working as expected.
- **Warning Logs:** Indicate something unexpected happened or indicative of some problem in the near future.
- **Error Logs:** Due to a more serious problem, the software has not been able to perform some function.

**Log Configuration:**

- Configured in `server/main.py` and `server/config.py`.
- Logs are output to the console with timestamps, log levels, and messages.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:

- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [https://github.com/yourusername](https://github.com/yourusername)

---

*Happy Planning! 🚀*