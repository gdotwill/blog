import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/blog.png";
import '../index.css'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutNavbar = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" className="image" />
          </a>
        </div>
        <div className="links">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <button 
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={logoutNavbar}>
              Logout
            </button>
          ) : (
            <button 
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => navigate("/login")}>
              Login
            </button>
          )}
          <button 
            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
            onClick={() => navigate("/write")}>
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
