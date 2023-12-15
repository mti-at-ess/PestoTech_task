// TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ mode, taskId, onCancel, navigate }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
      console.log('Current mode:', mode);

    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (mode !== 'create') {
      fetchTask();
    }
  }, [mode, taskId, accessToken]);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'create') {
        await axios.post('http://localhost:8000/tasks/', task, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Task created successfully!');
        onCancel(); // Close the form after creating the task
      } else if (mode === 'update') {
        await axios.patch(`http://localhost:8000/tasks/${taskId}`, task, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Task updated successfully!');
      } else if (mode === 'delete') {
        await axios.delete(`http://localhost:8000/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Task deleted successfully!');
        onCancel(); // Close the form after deleting the task
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('Task state:', task);
  console.log('Mode:', mode);

  return (
    <div>
      <h2>{mode === 'view' ? 'View Task' : mode === 'update' ? 'Update Task' : mode === 'delete' ? 'Delete Task': 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          readOnly={mode === 'view' || mode === 'delete'}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          readOnly={mode === 'view' || mode === 'delete'}
        />

        <label>Status:</label>
        <select
          name="status"
          value={task.status}
          onChange={handleInputChange}
          readOnly={mode === 'view' || mode === 'delete'}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {mode !== 'view' && (
          <div>
            <button type="submit">{mode === 'update' ? 'Update' : mode === 'delete' ? 'Delete': 'Create'}</button>
            {mode === 'create' && (
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
