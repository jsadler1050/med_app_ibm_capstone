import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [click, setClick] = useState(false); // Tracks menu click state for responsiveness
    const handleClick = () => setClick(!click);
    
    return (
        <nav>
            <div className="nav__logo">
            <Link to="/">
                StayHealthy 
            </Link>
            <span>.</span>
            </div>

            <div className="nav__icon" onClick={handleClick}>
            <i className="fa fa-times fa fa-bars"></i>
            </div>

            <ul className="nav__links active">
            <li className="link">
                <Link to="/">Home</Link>
            </li>
            <li className="link">
                <Link to="#">Appointments</Link>
            </li>
            <li className="link">
                <Link to="../Sign_Up//Sign_Up.html">
                <button className="btn1">Sign Up</button>
                </Link>
            </li>
            <li className="link">
                <Link to="../Login/Login.html">
                <button className="btn1">Login</button>
                </Link>
            </li>
            </ul>
        </nav>

    )
};

export default Navbar;