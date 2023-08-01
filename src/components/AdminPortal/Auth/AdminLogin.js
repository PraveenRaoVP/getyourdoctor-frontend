import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AuthService from '../../services/AuthService';
import './adminLoginStyles.css';

const AdminLogin = ({ handleSuccessfulAdminLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const corsUrl = process.env.REACT_APP_CORS_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
 
 
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`${corsUrl}/${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        handleSuccessfulAdminLogin(user);
        navigate('/admin/home'); // Redirect to the admin home page after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }

    };

  return (
    <div className='container'>
        <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
        {error && <div>{error}</div>}
      </form>
      </div>
    </div>
  );
};

export default AdminLogin;