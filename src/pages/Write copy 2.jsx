import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Logo from "../images/blog.png";
import { FaCamera } from "react-icons/fa";

const Write = () => {
  const state = useLocation().state;

  // Define the state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to post a blog.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/posts',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('RES', response)

      setMessage('Blog created successfully!');
      navigate('/');  // Redirect to dashboard or blog list
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage(error.response?.data?.message || 'Failed to create blog.');
    }
  };


  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
        >Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Write;
