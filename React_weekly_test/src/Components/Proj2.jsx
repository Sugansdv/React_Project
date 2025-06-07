import React, { useState } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage'; 
import '../App.css';

export default function Proj2() {
  const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all'); 
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
  
    <div className="todo-container container py-4">
      <h1 className="mb-4 text-center">Project 2: Todo List Application
</h1>

      <form onSubmit={handleAddTask} className="mb-4 d-flex justify-content-center">
        <div className="input-group custom-input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      <div className="mb-3 text-center">
        <button
          className={`btn btn-sm me-2 ${filter === 'all' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-sm me-2 ${filter === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`btn btn-sm ${filter === 'pending' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      <div className="task-list-wrapper mx-auto">
        <ul className="list-group">
          {filteredTasks.length === 0 && (
            <li className="list-group-item">No tasks to show.</li>
          )}
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? 'list-group-item-success' : ''
              }`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  id={`task-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className="custom-task-label"
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {task.text}
                </label>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => confirmDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {taskToDelete !== null && (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup card p-4">
            <p>Are you sure you want to delete this task?</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={deleteTask}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
