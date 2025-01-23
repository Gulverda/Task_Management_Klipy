import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);

      localStorage.setItem('authToken', response.data.token);

      onLoginSuccess(response.data.token);
      console.log('Login successful:', response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'An error occurred');
      } else {
        setErrorMessage('An error occurred');
      }
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="center">
      <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
