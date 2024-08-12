import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import { account } from '../appwrite/config';

function Home() {
  const navigate = useNavigate(); // Correct function name for navigation

  useEffect(() => {
    // Log account details or any necessary setup
    console.log('Appwrite account:', account);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('You clicked submit.');
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
}

export default Home;
