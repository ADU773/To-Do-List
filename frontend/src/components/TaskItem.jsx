// A single task row: checkbox (complete/incomplete) + delete button
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, task.completed)}
        />
        <span>{task.title}</span>
      </div>

      <button className="delete-button" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
