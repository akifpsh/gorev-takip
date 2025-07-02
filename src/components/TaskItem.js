// TaskItem.js: Renders a single task row with edit, delete, and complete actions.

import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaRegSquare, FaCheckSquare } from "react-icons/fa";

function TaskItem({ task, onToggleComplete, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  // Save the changes when editing is done
  const handleSave = () => {
    onEditTask(task.id, editTitle, editDescription);
    setIsEditing(false);
  };
  
  // Cancel editing and revert changes
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  }
  if (isEditing) {
    return (
      <tr className={task.completed ? "row-completed" : "row-active"}>
        <td>
          {task.completed
            ? <FaCheckSquare color="#44c37f" size={22} />
            : <FaRegSquare color="#bbb" size={22} />}
        </td>
        <td>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
        </td>
        <td>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-input"
          />
        </td>
        <td>{task.date}</td>
        <td className="actions">
          <button className="icon-btn" onClick={handleSave}>
            <FaCheck />
          </button>
          <button className="icon-btn" onClick={handleCancel}>
            <FaTimes />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className={task.completed ? "row-completed" : "row-active"}>
      <td>
        <span
          style={{ cursor: "pointer", fontSize: 22, userSelect: "none" }}
          onClick={() => onToggleComplete(task.id)}
          title={task.completed ? "Tamamlandı" : "Tamamlanmadı"}
        >
          {task.completed
            ? <FaCheckSquare color="#44c37f" />
            : <FaRegSquare color="#bbb" />}
        </span>
      </td>
      <td
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.title}
      </td>
      <td
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.description}
      </td>
      <td
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.date}
      </td>
      <td className="actions">
        <button className="icon-btn" onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>
        <button
          className="icon-btn"
          onClick={() => onDeleteTask(task.id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;