// App.js: Main application component. Handles global state, API calls, and layout.

import AddTaskForm from './components/AddTaskForm';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const API_URL = 'https://686505925b5d8d03397f5923.mockapi.io/tasks/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tasks from API on mount
  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error('Görevler yüklenemedi');
      return res.json();
    })
    .then(data => setTasks(data.reverse()))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));  
  }, []);

  // Add a new task  
  const handleAddTask = async (title, description) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          completed: false,
          date: new Date().toISOString().slice(0, 10)
        })
      });
      if (!res.ok) throw new Error('Görev eklenemedi');
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      toast.success("Görev eklendi!");
    } catch (err) {
      setError(err.message);
      toast.error("Görev eklenemedi!");
    } finally {
      setLoading(false);
    }
  };

  // Edit existing task
  const handleEditTask = async (id, newTitle, newDescription) => {
    setLoading(true);
    setError('');
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskToUpdate,
          title: newTitle,
          description: newDescription
        })
      });
      if (!res.ok) throw new Error('Görev güncellenemedi');
      const updatedTask = await res.json();
      setTasks(tasks =>
        tasks.map(task =>
          task.id === id ? updatedTask : task
        )
      );    
      toast.success("Görev güncellendi!");
    } catch (err) {
      setError(err.message);
      toast.error("Görev güncellenemedi!");
    } finally {
      setLoading(false);
    }
  };
  
   // Toggle task completion
  const handleToggleComplete = async (id) => {
    setLoading(true);
    setError('');
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskToUpdate,
          completed: !taskToUpdate.completed
        })
      });
      if (!res.ok) throw new Error('Durum güncellenemedi');
      const updatedTask = await res.json();
      setTasks(tasks =>
        tasks.map(task =>
          task.id === id ? updatedTask : task
        )
      );
      toast.success(
        updatedTask.completed ? "Görev tamamlandı!" : "Görev aktif hale getirildi!"
      );
    } catch (err) {
      setError(err.message);
      toast.error("Görev durumu değiştirilemedi!");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Görev silinemedi');
      setTasks(tasks => tasks.filter(task => task.id !== id));
      toast.success("Görev silindi!");
    } catch (err) {
      setError(err.message);
      toast.error("Görev silinemedi!");
    } finally {
      setLoading(false);
    }
  };
    
  // Filter tasks based on current filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="container" style={{ position: "relative" }}>
      {loading && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(255,255,255,0.7)", display: "flex",
          flexDirection: "column", // Bu satırı ekle
          justifyContent: "center", alignItems: "center", zIndex: 99
        }}>
          <div className="loader-spinner"></div> {/* Dönen daire */}
          <div style={{fontSize: "1.1rem", color: "#333"}}>Yükleniyor...</div>
        </div>
      )}
      <h1>Görev Takip Uygulaması</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
      {error && <div style={{color:"red"}}>Hata: {error}</div>}
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
