import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for navigation
import { account } from '../appwrite/config';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Correct hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Form validation
    if (name === '' || email === '' || password === '') {
      setError('Please enter all details.');
      return;
    }

    try {
      await register(); // Wait for registration to complete
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const register = async () => {
    try {
      const userDetails = await account.create('unique()', email, password, name);
      console.log('User registered:', userDetails);
      navigate('/dashboard'); // Navigate to dashboard on successful registration
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Rethrow the error to be caught in handleSubmit
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
