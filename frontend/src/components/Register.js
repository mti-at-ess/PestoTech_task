// Register.js
import React, {useState} from 'react';
import axios from 'axios';
import './style.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/register', formData);

            console.log('Registration successful!', response.data);
            // Optionally, you can redirect to the login page or handle the success in some way
        } catch (error) {
            if (error.response && error.response.data) {
                // If the server responds with validation errors, set them in the state
                setErrors(error.response.data);
            } else {
                console.error('Registration error:', error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
            />
            {errors.username && <div className="error">{errors.username[0]}</div>}

            <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email[0]}</div>}

            <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password[0]}</div>}

            <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
            />
            {errors.first_name && <div className="error">{errors.first_name[0]}</div>}

            <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
            />
            {errors.last_name && <div className="error">{errors.last_name[0]}</div>}

            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
