// Import necessary modules from React library
import React from 'react';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import Reviews from './Components/Reviews/Reviews';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
            <Notification>
          {/* Display the Navbar component */}
          <Navbar/>

            {/* Set up the Routes for different pages */}
                <Routes>
                    {/* Define individual Route components for different pages */}
                    <Route path="/" element={<Landing_Page/>}/>
                    <Route path="/login" element={<Login />} /> {/* Route for login page */}
                    <Route path="/signup" element={<Sign_Up />} /> {/* Route for sign up page */}
                    <Route path="/instant-consultation" element={<InstantConsultation />} />
                    <Route path="/reviews" element={<Reviews />} /> {/* Route for sign up page */}
                </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;