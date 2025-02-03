import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../images/blog.png";

const Register = () => {
  const [inputs, setInputs] = useState({
    // setting initial state for inputs using useState hook
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null); // setting initial state for error using useState hook

  const navigate = useNavigate(); // using useNavigate hook from react-router-dom to navigate

  const handleChange = (e) => {
    // function to handle input changes
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // using spread operator to spread previous state and update the current input
  };

  const handleSubmit = async (e) => {
    // function to handle form submit
    e.preventDefault(); // preventing the default form submission behavior
    try {
      await axios.post("/auth/register", inputs); // making a post request to register the user using axios library
      navigate("/login"); // navigating to login page after successful registration
    } catch (err) {
      // handling errors if any
      setError(err.response.data); // setting error message from response data
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
            <form onChange={handleChange}>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
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
                  placeholder="Enter email"
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
                  placeholder="Enter password"
                  className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
                />
              </div>

              <button 
                type="submit" 
                disabled="" 
                class="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSubmit}
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

