import React, { useState, useEffect } from 'react';

// Import styles for the login component (replace with your CSS path)
import './Login.css'; // Commented reminder for CSS import

// Import necessary components from react-router-dom for navigation
import { Link, useNavigate } from 'react-router-dom';

// Import the base URL for API calls (replace with your actual URL)
import { API_URL } from '../../config'; // Commented reminder for API_URL import

const Login = () => {

  // State variables to store user credentials (email and password)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // useEffect hook to check for existing auth token on component mount
  useEffect(() => {
    // Check if 'auth-token' exists in session storage
    if (sessionStorage.getItem("auth-token")) {
      // If token exists, redirect to home page
      navigate("/");
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  // Asynchronous function to handle user login form submission
  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (reloading)

    // Create a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, // Send user email in request body
        password: password, // Send user password in request body
      }),
    });

    // Parse the JSON response from the API
    const json = await res.json();

    // Handle successful login
    if (json.authtoken) {
      // Store auth token and email in session storage
      sessionStorage.setItem('auth-token', json.authtoken);  
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload (consider alternative approaches for smoother experience)
      navigate('/');
      window.location.reload();
    } else {
      // Handle failed login
      if (json.errors) {
        // Display error messages from the API response (consider a more user-friendly approach)
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        // Display general error message if no specific errors provided
        alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? <span><Link to="/signup" style={{ color: '#2190FF' }}> Sign Up Here</Link></span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        aria-describedby="helpId"/>
                </div>
                <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;