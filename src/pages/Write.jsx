import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Logo from "../images/blog.png";
import { FaCamera } from "react-icons/fa";
import Navbar from "../components/Navbar";

import api from "../api/api";

const Write = () => {
  const state = useLocation().state;

  // Define the state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [category, setCat] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState({}); 
  const [loading, setLoading] = useState(false); 
  const [fileName, setFileName] = useState(''); // State to store the file name

  const validate = () => {
    let validationError = {};

    // Check if the title is empty
    if (!title.trim()) {
      validationError.title = 'Title is required';
    }

    // Check if the description is empty
    if (!description.trim()) {
      validationError.description = 'Description is required';
    }

    // Check if the description is empty
    if (!category.trim()) {
      validationError.description = 'Description is required';
    }

    // Check if the image is selected and valid (file should be an image)
    if (!image) {
      validationError.image = 'Image is required';
    } else if (!image.type.startsWith('image/')) {
      validationError.image = 'Please upload a valid image file (jpg, png, etc.)';
    }

    setError(validationError);
    return Object.keys(validationError).length === 0; // Return true if no error
  };
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    setLoading(true);
  
    try {
      const response = await api.post('/posts', formData, 
        {
          headers: {  
            // 'Authorization': `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data', 
            // 'Content-Type': 'application/json',
              
          },
        }
      );

      setMessage('Post created successfully!');
      setError('');
      navigate('/');  // Redirect to dashboard or blog list
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage(error.response?.data?.message || 'Failed to create blog.');
      console.error(error);
      setError('Error creating post.');
      console.log("NOOO")
    } finally {
      // Reset loading state after the request is completed
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file').click(); // Trigger the hidden file input click
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="py-2">
        <div className="add mt-3">
          <div className="content">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              placeholder="Add title"
            />
            {error.title && <span style={{ color: 'red' }}>{error.title}</span>} {/* Display title error */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              rows="10"
            />
            {error.description && <span style={{ color: 'red' }}>{error.description}</span>} {/* Display description error */}
          </div>
          <div className="menu">
            <div className="item mt-3">
                <h1><strong>Category</strong></h1>
                <div className="cat mt-3">
                  <input
                    type="radio"
                    checked={category === "Art"}
                    name="category"
                    value="Art"
                    id="art"
                    onChange={(e) => setCat(e.target.value)}   
                  />
                  <label htmlFor="art"> Art</label>
                </div>

                <div className="cat mt-3">
                  <input
                    type="radio"
                    checked={category === "Science"}
                    name="category"
                    value="Science"
                    id="science"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science"> Science</label>
                </div>

                <div className="cat mt-3">
                  <input
                    type="radio"
                    checked={category === "Food"}
                    name="category"
                    value="Food"
                    id="food"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food"> Food</label>
                </div>
              </div>
    
              <input       
                type="file"
                id="file"
                name=""
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {fileName && (
                <div>
                  <strong>Selected File: </strong> {fileName}
                </div>
              )}
              {error.image && <span style={{ color: 'red' }}>{error.image}</span>} {/* Display image error */}

              {/* <label className="file" htmlFor="file">
                <FaCamera className="icon" size={30} />
              </label> */}
              

              {loading ? (
                <div className="loader"></div>
              ) : (
                
                <button 
                  type="submit"
                  className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                > Publish
                </button>
              )}

            </div>
        </div>  
      </form>
    </>

  );
};

export default Write;
