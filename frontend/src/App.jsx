import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Backend API address (backend runs on port 5000)
const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks once, when the page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET /api/tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // POST /api/tasks - add a task, then put it at the top of the list
  const addTask = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks((prev) => [response.data, ...prev]);
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      return false;
    }
  };

  // PUT /api/tasks/:id - mark complete / incomplete
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !completed
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // DELETE /api/tasks/:id - remove the task from the server and the screen
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List</h1>

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <p className="task-count">Total Tasks: {tasks.length}</p>
      </div>
    </div>
  );
}

export default App;
