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


  const [err, setError] = useState(null); // setting initial state for error using useState hook

  const navigate = useNavigate(); // using useNavigate hook from react-router-dom to navigate

  const handleChange = (e) => {
    // function to handle input changes
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // using spread operator to spread previous state and update the current input
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
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="py-2">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" className="image"/>
          </a>
        </div>
          <div className="w-full max-w-sm mx-auto">
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
              </div>

              <button 
                type="submit" 
                disabled="" 
                class="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
                
              > Sign Up</button>

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

