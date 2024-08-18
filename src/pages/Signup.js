import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for navigation
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/config';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [buttonLoading, setButtonLoading] = useState(false); // Add state for button loading spinner
  const navigate = useNavigate(); // Correct hook for navigation

  const notifyAccountCreate = () => {
    toast.success("Account created Successfully!", {
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
    setError(''); // Reset error message
    setButtonLoading(true); // Start button loading

    // Form validation
    if (name === '' || email === '' || password === '') {
      setError('Please enter all details.');
      setButtonLoading(false); // Stop button loading
      return;
    }

    try {
      await register(); // Wait for registration to complete
    } catch (error) {
      setButtonLoading(false); // Stop button loading on error
      setError('Registration failed. Please try again.');
    }
  };

  const register = async () => {
    try {
      const userDetails = await account.create('unique()', email, password, name);
      console.log('User registered:', userDetails);
      notifyAccountCreate();
      setTimeout(() => {
        navigate('/login'); // Navigate to login on successful registration
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Rethrow the error to be caught in handleSubmit
    } finally {
      setButtonLoading(false); // Stop button loading once the registration process is complete
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
          <button type="submit" className="signup-btn">
            {buttonLoading ? <ClipLoader size={15} color={"white"} loading={buttonLoading} /> : 'Sign Up'}
          </button>
        </form>
        <div className="signup-link">
          <p>Already have an account?</p>
          <a href="/login" className="signup-btn-link">Login</a>
        </div>
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

export default Signup;
