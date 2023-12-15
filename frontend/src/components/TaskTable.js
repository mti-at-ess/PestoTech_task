// TaskTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm'; // Import the TaskForm component
import './style.css';
import {useNavigate} from "react-router-dom"; // Import the CSS file

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTasks(response.data);
      } catch (error) {

        console.error('Error fetching tasks:', error);
        navigate("/login");
      }
    };

    // Call the fetchTasks function when the component mounts
    fetchTasks();
  }, [accessToken]); // useEffect dependency to re-fetch tasks when the accessToken changes
  console.log('Access Token:', accessToken);

  const handleView = (taskId) => {
    // Set the selected task for viewing
    setSelectedTask({ id: taskId, mode: 'view' });
  };

  const handleModify = (taskId) => {
    // Set the selected task for updating
    setSelectedTask({ id: taskId, mode: 'update' });
  };

  const handleDelete = (taskId) => {
    // Set the selected task for deletion
    setSelectedTask({ id: taskId, mode: 'delete' });
  };

  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleView(task.id)}>View</button>
                <button onClick={() => handleModify(task.id)}>Modify</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TaskForm component for viewing, updating, or deleting tasks */}
      {selectedTask && <TaskForm mode={selectedTask.mode} taskId={selectedTask.id} />}
    </div>
  );
};

export default TaskTable;
