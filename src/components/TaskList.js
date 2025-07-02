// TaskList.js: Displays the list of tasks in a table. Maps each task to a TaskItem.

import TaskItem from "./TaskItem";
import React from "react";

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) return <p>Henüz eklenmiş görev yok.</p>;
  
  return (
    <div>
      <table className="task-table">
        <thead>
          <tr>
            <th></th>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Tarih</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
