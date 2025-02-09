import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/blog.png";

import api from "../api/api";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [registerError, setRegisterError] = useState(''); 
  const [loading, setLoading] = useState(false); 


  const [error, setError] = useState({}); // Store validation errors

  const navigate = useNavigate(); // using useNavigate hook from react-router-dom to navigate

  const handleChange = (e) => {
    // function to handle input changes
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // using spread operator to spread previous state and update the current input
  };

  const validate = () => {
    let validationErrors = {};

    // Check if email is empty or invalid
    // Check if password is empty or too short
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (username.length < 2 || username.length > 15) {
      validationErrors.username = 'Username must be between 2 and 15 characters';
    }

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
    } 

    // Check if password is empty or too short
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 2) {
      validationErrors.password = 'Password must be at least 2 characters';
    }

    setError(validationErrors);
    return Object.keys(validationErrors).length === 0; // If no errors, return true
  };

  // const handleSubmit = async (e) => {
  //   // function to handle form submit
  //   e.preventDefault(); // preventing the default form submission behavior
  //   try {
  //     await api.post("/register", inputs); // making a post request to register the user using axios library
  //     navigate("/login"); // navigating to login page after successful registration
  //   } catch (err) {
  //     // handling errors if any
  //     setError(err.response.data); // setting error message from response data
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      navigate('/login');

    } catch (error) {
      setError(error.response.data.message);
      setRegisterError('An error occurred during login, please try again.');
    } finally {
      // Reset loading state after the request is completed
      setLoading(false);
    }
  };

  return (
    <div className="py-2">
        <div className="logo login-wrapper">
          <a href="/">
            <img src={Logo} alt="logo" className="image" />
          </a>
        </div>
          <div className="w-full max-w-sm mx-auto mt-14">
            <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // onChange={handleChange}
                  className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
                />
                {error.username && <span style={{ color: 'red' }}>{error.username}</span>}
              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-[#5a7184] font-semibold block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // onChange={handleChange}
                  className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
                />
                {error.email && <span style={{ color: 'red' }}>{error.email}</span>}

              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  // onChange={handleChange}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
                />
                {error.password && <span style={{ color: 'red' }}>{error.password}</span>}

              </div>

              {registerError && <span style={{ color: 'red', display: 'block' }}>{registerError}</span>}


              {loading ? (
                <div className="loader"></div>
              ) : (
                
              <button 
                type="submit" 
                disabled="" 
                class="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
                
              > Sign Up</button>
              )}



              <p className="text-sm font-semibold text-[#5a7184]">
                You have an account?{" "}
                {/* <Link to="/login" className="text-primary">
                  Login now
                </Link> */}
                <span onClick={() => navigate("/login")}>
                  <button onClick={handleSubmit}>Login now</button>{" "}
                </span>
                
              </p>
            </form>
          </div>

    </div>
  );
};

export default Register; 

