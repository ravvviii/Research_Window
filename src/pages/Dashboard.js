import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await account.get('current');
        if (user) {
          setEmail(user.email || '');
          setName(user.name || '');
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim() === '') {
      alert('Please enter a todo.');
      return;
    }
    setTodos([...todos, todo]);
    setTodo('');
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading">Loading your dashboard...</div>
      ) : (
        <>
          {email && name ? (
            <div className="dashboard-header">
              <h2>Welcome, {name}</h2>
              <p className="dashboard-email">Email: {email}</p>
              <button className="logout-btn" onClick={onLogout}>Logout</button>

              <div className="todo-section">
                <h3>Your Todos</h3>
                <input 
                  type="text" 
                  placeholder="Add a new todo" 
                  value={todo}
                  onChange={handleTodoChange}
                  className="todo-input"
                />
                <button className="add-todo-btn" onClick={handleAddTodo}>Add Todo</button>
                <ul className="todo-list">
                  {todos.map((item, index) => (
                    <li key={index} className="todo-item">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <h2>No user information available</h2>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
