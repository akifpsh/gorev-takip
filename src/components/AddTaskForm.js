// AddTaskForm.js: Form component to add a new task (title + optional description).

import { useState } from "react";

function AddTaskForm({ onAddTask }) {
    const[title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handles form submission for adding a task
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddTask(title, description);
        setTitle('');
        setDescription('');
    };

 return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Açıklama"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">EKLE</button>
    </form>
  );
}

export default AddTaskForm;
