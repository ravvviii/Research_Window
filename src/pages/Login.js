import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners
import { account } from '../appwrite/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setLoading(true); // Start loading

    // Form validation
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      await login(); // Wait for login to complete
    } catch (error) {
      setLoading(false); // Stop loading on error
      setError('Email and password are incorrect.');
    }
  };

  const login = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      if (error.message.includes('Invalid credentials')) {
        setError('Email and password are incorrect.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      throw error; // Rethrow the error to be caught in handleSubmit
    } finally {
      setLoading(false); // Stop loading once the login process is complete
    }
  };

  return (
    <div className="login-container">
      {loading ? ( // Conditionally render the ClipLoader spinner
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      ) : (
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
      )}
    </div>
  );
}

export default Login;
