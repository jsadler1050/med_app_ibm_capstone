import React, { useState } from 'react';
import './Sign_Up.css' // Import styles for the component (optional)
import { Link, useNavigate } from 'react-router-dom'; // For navigation and routing
import { API_URL } from '../../config'; // Likely contains the base URL for API calls

const Sign_Up = () => {

  // State variables to store user input and error messages
  const [name, setName] = useState(''); // State for user name
  const [email, setEmail] = useState(''); // State for email
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState(''); // State for password
  const [showerr, setShowerr] = useState(''); // State for general error message
  const [showPhoneErr, setShowPhoneErr] = useState(''); // State for phone number specific error message

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle phone number blur event (triggered when user leaves the input field)
  const handlePhoneBlur = (e) => {
    const phoneNumber = e.target.value;

    // Update phone number error message based on validation
    if (phoneNumber.length === 10) {
      setShowPhoneErr(''); // Clear error if phone number has 10 digits
    } else if (phoneNumber.length > 0 && phoneNumber.length < 10) {
      setShowPhoneErr('Phone number must be exactly 10 characters long.'); // Set error for invalid length
    }
  };

  // Asynchronous function to handle user registration
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // API call to register user
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const json = await response.json(); // Parse the JSON response from the API

    // Handle successful registration
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
    
      // Redirect to home page and reload (consider alternative approaches for smoother experience)
      navigate("/");
      window.location.reload();
    } else {
      // Handle registration errors
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg); // Set general error message from API response
        }
      } else {
        setShowerr(json.error); // Set general error message if no specific errors provided
      }
    }
  };

    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={handlePhoneBlur} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                            {showPhoneErr && <div className="err" style={{ color: 'red' }}>{showPhoneErr}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
 //Sign up role is not stored in database. You can apply logic for this according to your react code.
    );
}

export default Sign_Up;