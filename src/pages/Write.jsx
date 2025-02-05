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
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to post a blog.');
      return;
    }

    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cat', cat);
    if (image) {
      formData.append('image', image);
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/api/posts', formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            
          },
        }
      );

      setMessage('Post created successfully!');
      setError('');
      console.log("DDDDDDD", response.data.blog);
      navigate('/');  // Redirect to dashboard or blog list
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage(error.response?.data?.message || 'Failed to create blog.');
      console.error(error);
      setError('Error creating post.');
      console.log("NOOO")
    }
  };





  return (
    <div className="py-2">
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="logo" className="image"/>
        </a>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            placeholder="Add title"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>
        <div className="menu">
          <div className="item mt-3">
            <h1><strong>Category</strong></h1>

            <div className="cat mt-3">
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCat(e.target.value)}   
              />
              <label htmlFor="art"> Art</label>
            </div>

            <div className="cat  mt-3">
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science"> Science</label>
            </div>

            <div className="cat  mt-3">
              <input
                type="radio"
                checked={cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology"> Technology</label>
            </div>

            <div className="cat  mt-3">
              <input
                type="radio"
                checked={cat === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="cinema"> Cinema</label>
            </div>

            <div className="cat  mt-3">
              <input
                type="radio"
                checked={cat === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="design"> Design</label>
            </div>

            <div className="cat mt-3">
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="food"> Food</label>
            </div>
          </div> 
          <div className="photo rounded-full">

            {/* <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            /> */}

            <input 
              type="file" 
              id="image" 
              name="image" 
              onChange={(e) => setImage(e.target.files[0])}
            />

            <label className="file" htmlFor="file">
              <FaCamera className="icon" size={30} />
            </label>
          </div>

          <button 
            type="submit"
            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
          > Publish
          </button>
        
        </div>
      </form> 
      {message && <p>{message}</p>} 
    </div>
  );
};

export default Write;
