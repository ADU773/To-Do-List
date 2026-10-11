# MERN Stack To-Do List

A full-stack To-Do List application built with **MongoDB, Express.js, React.js and Node.js** (23CSB40B Web Technology - Assignment 2).

Tasks are stored in MongoDB through a REST API, so they persist across page refreshes.

## Project Structure

    backend/      Express server, Mongoose model, REST API
      models/task.js
      server.js
      .env.example
    frontend/     React (Vite) user interface
      src/components/TaskForm.jsx, TaskList.jsx, TaskItem.jsx
      src/App.jsx
    screenshots/  Screenshots of the working application

## Requirements

- Node.js and npm
- A MongoDB database (MongoDB Atlas or local MongoDB)

## How to Run

### 1. Backend

    cd backend
    npm install

Create a `.env` file inside `backend/` (copy `.env.example`) and fill in the values:

    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    FRONTEND_URL=http://localhost:5173

| Variable | Meaning |
|----------|---------|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Port for the backend (default 5000) |
| `FRONTEND_URL` | The only origin allowed by CORS (default `http://localhost:5173`) |

Start the backend:

    npm start

Backend runs at http://localhost:5000

### 2. Frontend

Open a second terminal:

    cd frontend
    npm install
    npm run dev

Frontend runs at http://localhost:5173 - open it in the browser. Keep both servers running.

## REST API

| Method | Endpoint | Description | Status codes |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Fetch all tasks | 200 |
| POST | `/api/tasks` | Add a task `{ title }` | 201, 400 (empty title) |
| PUT | `/api/tasks/:id` | Update `title` and/or `completed` | 200, 400, 404 |
| DELETE | `/api/tasks/:id` | Delete a task | 200, 400, 404 |

Task model: `title` (String, required), `completed` (Boolean, default false), `createdAt` (Date, default now).

## Features

- Add, view, complete/incomplete (strike-through) and delete tasks
- Title validation (converted to string, trimmed, empty rejected with 400)
- CORS restricted to the frontend address
- UI updates through React state without a page reload

## Screenshots

See the `screenshots/` folder.

## Notes

The `.env` file is not committed. Never share your MongoDB password publicly.
