import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const PatientLogin = ({ handleSuccessfulLogin }) => {
    const apiUrl = process.env.REACT_APP_API_URL;   
    const corsUrl = process.env.REACT_APP_CORS_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = async () => {
    try {
      const response = await fetch(`${corsUrl}/${apiUrl}/patients/login`, {
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
        //const token = await response.text();
        // Save the token in local storage or cookies
        //localStorage.setItem('authToken', token);

        // Redirect to the home page or any other page after successful login
        // You can use react-router-dom for navigation
        const user = await response.json();
        //console.log(user)
        handleSuccessfulLogin(user);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An error occured during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Register now</Link>
      </p>
    </div>
  );
};


export default PatientLogin
