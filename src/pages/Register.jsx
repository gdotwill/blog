import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <section className="container mx-auto px-5 py-10">
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
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
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
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
              />
            </div>
            <button type="submit" disabled="" class="bg-primary text-black font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed">Sign In</button>
            <button
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              {/* <Link to="/login" className="text-primary">
                Login now
              </Link> */}
              <button onClick={handleSubmit}>Login now</button>{" "}
            </p>
          </form>
        </div>
      </section>
  );
};

export default Register; // exporting Register component
