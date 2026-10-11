import { useState } from "react";

// Form to add a new task. Calls onAdd(title) from the parent on submit.
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const ok = await onAdd(title); // parent sends POST request
    if (ok) setTitle(""); // clear the input after a successful add
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
