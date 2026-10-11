// ==========================================
// To-Do List backend: Node.js + Express + MongoDB (Mongoose)
// ==========================================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // loads variables from .env into process.env

const Task = require("./models/task");

const app = express();

// ---------- Middleware ----------
// CORS is restricted to the frontend's address only (not every origin)
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173"
    })
);
// Read JSON request bodies
app.use(express.json());

// ---------- MongoDB connection ----------
// Connection string comes from .env (MONGO_URI), never hard-coded
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Home route
app.get("/", (req, res) => {
    res.send("To-Do List Backend is running");
});

// Helper: convert to string and trim, as required for title validation
const cleanTitle = (value) => String(value ?? "").trim();

// ==========================================
// GET /api/tasks  -> fetch all tasks
// ==========================================
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message
        });
    }
});

// ==========================================
// POST /api/tasks  -> add a new task
// Body: { title }
// 201 on success, 400 if the title is empty
// ==========================================
app.post("/api/tasks", async (req, res) => {
    try {
        const title = cleanTitle(req.body.title);

        if (title === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const savedTask = await new Task({ title }).save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({
            message: "Error adding task",
            error: error.message
        });
    }
});

// ==========================================
// PUT /api/tasks/:id  -> update a task
// Body: { completed } and/or { title }
// 400 for empty title / bad id, 404 if task not found
// ==========================================
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid task id" });
        }

        // Only allow the fields that may be edited
        const updates = {};

        if (req.body.title !== undefined) {
            const title = cleanTitle(req.body.title);
            if (title === "") {
                return res.status(400).json({ message: "Title is required" });
            }
            updates.title = title;
        }

        if (req.body.completed !== undefined) {
            updates.completed = Boolean(req.body.completed);
        }

        const updatedTask = await Task.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
});

// ==========================================
// DELETE /api/tasks/:id  -> delete a task
// 400 for bad id, 404 if task not found
// ==========================================
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid task id" });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });
    }
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
