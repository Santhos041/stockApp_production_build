import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // import axios
import './Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');


    const bgImage = 'https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D'; // Use the correct path to your image file

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
    async function submit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            let BASE_URL = process.env.REACT_APP_BACKEND_URL;
            if(process.env.NODE_ENV === "production"){
             BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
            }
            const response = await axios.post(`${BASE_URL}Signup`, {
                email,
                password,
                fname,
                lname,
            });
            

            if (response.data === "Signup success") {
                alert("Signup successful!");
                navigate("/Login");  // Navigate to the Login page
            } else if (response.data === "User already exists") {
                alert("User already exists. Please login.");
            } else {
                alert("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            console.log(`${process.env.REACT_APP_BACKEND_URL}/Signup`);

            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div style={containerStyle}>
        <form onSubmit={submit}>
            <div className="sign_form">
                <div className="sign_det">
                    <h1><u>Signup</u></h1>
                    <div className="name">
                        <input
                            type="text"
                            placeholder="First name"
                            id="fname"
                            name="fname"
                            value={fname}
                            onChange={e => setFname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            id="lname"
                            name="lname"
                            value={lname}
                            onChange={e => setLname(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="pass"
                        name="pass"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        id="cpass"
                        name="cpass"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Signup</button>
                    <h5>Already have an account? <Link to="/Login">Login</Link></h5>
                </div>
            </div>
        </form>
        </div>
    );
}

export default Signup;
