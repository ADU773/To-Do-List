import TaskItem from "./TaskItem";

// Renders all tasks, or a message when there are none
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks available.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
