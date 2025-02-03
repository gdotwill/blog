import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../style.scss";
import "../index.css";
import Logo from "../images/blog.png";

// Define a functional component called Login
const Login = () => {
  // Use useState hook to create state variables for inputs and errors
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  // Use useNavigate hook to create a navigate function
  const navigate = useNavigate();

  //useContext hook to get the login function from the AuthContext.
  const { login } = useContext(AuthContext);

  // Define handleChange function to update the input state variables when the user types into the input fields
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Define handleSubmit function to handle the form submission when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the user input to the "/auth/login" endpoint and navigate to the home page
      await login(inputs);
      navigate("/");
    } catch (err) {
      // If there is an error, set the error state variable to the error message
      setError(err.response.data);
    }
  };

  // Render the login form with input fields for username and password and a button to submit the form
  return (
    <div className="py-2">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" className="image" />
          </a>
        </div>
        <div className="w-full max-w-sm mx-auto mt-4">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Login
          </h1>
          <form>
            <div className="flex flex-col mb-6 w-full mt-8">
              <label
                htmlFor="username"
                className="text-[#5a7184] font-semibold block"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
                onChange={handleChange}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"

              />
            </div>
            {/* <Link
              to="/forget-password"
              className="text-sm font-semibold text-primary"
            >
              Forgot password?
            </Link> */}

            <button
              type="submit"
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              Sign In
            </button>

            <p className="text-sm font-semibold text-[#5a7184]">
              Do not have an account?{" "}
              <Link to="/register" className="text-primary">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default Login;
