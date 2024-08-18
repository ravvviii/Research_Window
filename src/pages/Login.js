import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifyLogin = () => {
    toast.success("Login Successful!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    console.log("Toast is working");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await login();
    } catch (error) {
      setLoading(false);
      if (error.message.includes('Invalid credentials')) {
        setError('Email and password are incorrect.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const login = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', response);
      notifyLogin(); // Trigger the toast notification here
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000); // Adjust the delay if needed
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
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
          <button type="submit" className="login-btn">
            {loading ? <ClipLoader size={15} color={"white"} loading={loading} /> : 'Login'}
          </button>
          <a href="/signup" className="signup-btn-link">Create Account!</a>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Login;
