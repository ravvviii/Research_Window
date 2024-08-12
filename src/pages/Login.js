import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Form validation
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(); // Wait for login to complete
    } catch (error) {
      setError('Email and password are incorrect.');
    }
  };

  const login = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be caught in handleSubmit
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <a href="/signup" className="signup-btn-link">Create one</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
