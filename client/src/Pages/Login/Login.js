import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const bgImage = 'https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Use the correct path to your image file

    // Styles for the container that holds the background image
    const containerStyle = {
        backgroundImage: `url(${bgImage})`,  // Set the background image
        backgroundSize: 'cover',             // Ensure the image covers the entire area
        backgroundPosition: 'center',        // Center the image
        backgroundRepeat: 'no-repeat',       // Prevent image repetition
        height: '100vh',                     // Full viewport height
        display: 'flex',                     // Use flexbox to center the form
        justifyContent: 'center',            // Center horizontally
        alignItems: 'center',                // Center vertically
        margin: 0,                           // Remove default body margin
    };
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let BASE_URL = process.env.REACT_APP_BACKEND_URL;
            if(process.env.NODE_ENV === "production"){
             BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
            }
            console.log("Backend URL:", BASE_URL);  // Log the URL being used

            // Use the backend URL here
            const response = await axios.post(`${BASE_URL}Login`, {
                email,
                password
            });

            if (response.data === "Login success") {
                Toastify({
                    text: "Login Successful!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#4CAF50",
                }).showToast();
                navigate("/LiveGraph");
            } else if (response.data === "Invalid password") {
                Toastify({
                    text: "Invalid password!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#ff0000",
                }).showToast();
            } else if (response.data === "User not found") {
                Toastify({
                    text: "User not found!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#ff0000",
                }).showToast();
            } else {
                alert("Error occurred");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div style={containerStyle}>
        <div className="log_form">
            
            <form onSubmit={handleSubmit}>
                <div className="log_det">
                    <h1><u>Login</u></h1>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        id="email"
                        name="email"
                    />
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        id="password"
                        name="password"
                    />
                    <br />
                    <button type="submit">Login</button>
                    <h5>Don't have an account?<Link to="/Signup"> Signup </Link></h5>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;
