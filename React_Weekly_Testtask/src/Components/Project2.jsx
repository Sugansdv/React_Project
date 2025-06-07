import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Project2() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('todo-data'));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [taskText, setTaskText] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todo-data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, text: taskText } : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        text: taskText,
        completed: false
      }]);
    }

    setTaskText('');
  };

  const toggleComplete = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = task => {
    setEditId(task.id);
    setTaskText(task.text);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container container mt-5 p-4 rounded shadow">
      <h2 className="text-center mb-4">To-Do List</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addTask}>
              {editId ? 'Update' : 'Add'}
            </button>
          </div>

          <div className="btn-group w-100 d-flex justify-content-between">
            {['All', 'Active', 'Completed'].map(type => (
              <button
                key={type}
                className={`btn btn-outline-dark flex-fill mx-1 ${filter === type ? 'active' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="list-group">
        {filteredTasks.length === 0 && (
          <li className="list-group-item text-center text-muted">No tasks found.</li>
        )}
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>

            <div>
              <button className="btn btn-sm btn-secondary me-2" onClick={() => startEdit(task)}>✏ Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => removeTask(task.id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
