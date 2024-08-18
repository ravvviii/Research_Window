import { Query } from 'appwrite';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, database } from '../appwrite/config';

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [alltodos, setAlltodos] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false); // State for logout spinner

  // Toast notification for adding todo
  const todoAdded = () => {
    toast.success("Todo Added", {
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
  };

  // Toast notification for logout
  const logoutToast = () => {
    toast.success("Logout Successful!", {
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
  };

  // Logout function
  const onLogout = async () => {
    setLogoutLoading(true); // Show spinner on logout button
    try {
      const session = await account.getSession('current');
      if (session) {
        await account.deleteSession('current');
        logoutToast(); // Trigger the toast notification
        // Wait for a short duration to allow the toast to be visible
        setTimeout(() => {
          navigate('/login');
        }, 1000); // Adjust the delay if needed
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out. Please try again.'); // Use toast for errors
    } finally {
      setLogoutLoading(false); // Hide spinner after logout attempt
    }
  };

  // Handle changes to the todo input
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  // Add a new todo
  const handleAddTodo = async () => {
    if (todo.trim() === '') {
      toast.warn('Please enter a todo.'); // Use toast for warnings
      return;
    }

    try {
      const document = await database.createDocument(
        process.env.REACT_APP_DB_ID,
        process.env.REACT_APP_COLLECTION_ID,
        'unique()',
        {
          email: email,
          todo: todo,
        }
      );
      setTodos([...todos, document]);
      setTodo('');
      await viewTodo();
      todoAdded();
    } catch (error) {
      console.error(error);
      toast.error('Error adding todo. Please try again.'); // Use toast for errors
    }
  };

  // Fetch todos based on email
  const viewTodo = useCallback(async () => {
    try {
      const documents = await database.listDocuments(
        process.env.REACT_APP_DB_ID,
        process.env.REACT_APP_COLLECTION_ID,
        [Query.equal('email', email)]
      );
      setAlltodos(documents.documents);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching todos. Please try again.'); // Use toast for errors
    }
  }, [email]);

  // Check login status and fetch user info
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await account.get('current');
        if (user) {
          setEmail(user.email || '');
          setName(user.name || '');
          viewTodo();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate, viewTodo]);

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {email && name ? (
            <div className="dashboard-header">
              <h2>Welcome, {name}</h2>
              <p className="dashboard-email">Email: {email}</p>
              <button 
                className="logout-btn" 
                onClick={onLogout}
                disabled={logoutLoading} // Disable button while loading
              >
                {logoutLoading ? <ClipLoader size={15} color={"white"} loading={logoutLoading} /> : 'Logout'}
              </button>

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
                  {alltodos.map((item) => (
                    <li key={item.$id} className="todo-item">{item.todo}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <h2>No user information available</h2>
          )}
        </>
      )}
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

export default Dashboard;
