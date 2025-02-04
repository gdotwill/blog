import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/blog.png";
import '../index.css';

import axios from 'axios';

import api from "../api/api";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/');
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("REEEEE", response)
        console.log("TTT", token)

        setUser(response.data.user);

      } catch (error) {
        console.error('Error fetching user:', error);

        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

 

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" className="image" />
          </a>
        </div>
        {isLoggedIn && (
          <div className="flex"> Welcome,  <strong className="ml-2 text-blue-500"><h1> {user?.username}</h1></strong> </div>
        )}
        <div className="links">
          {isLoggedIn ? (
              <button 
                className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={handleLogout}>
                Logout
              </button>
          ) : (
            <button 
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => navigate("/login")}>
              Login
            </button>
          )}
          {
            isLoggedIn && (
              <button 
                className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                onClick={() => navigate("/write")}>
                Add Post
              </button>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
