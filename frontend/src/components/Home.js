// Home.js
import React, { useState, useEffect } from 'react';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate(); // Assuming navigate is a function from react-router-dom

  const accessToken = localStorage.getItem('accessToken');

  console.log(accessToken);

  const handleCreateTask = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  useEffect(() => {
    // If navigate is used inside useEffect, include it in the dependency array
    console.log('Navigation effect');
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={handleCreateTask}>Create Task</button>
      <TaskTable />
      {showCreateForm && (
        <TaskForm
          mode="create"
          onCancel={handleCancelCreate}
          navigate={navigate} // Pass navigate as a prop to TaskForm
        />
      )}
    </div>
  );
};

export default Home;
