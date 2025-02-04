import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Logo from "../images/blog.png";
import { FaCamera } from "react-icons/fa";

const Write = () => {
  // Get the location state using the `useLocation` hook
  // will be used to check if we are in writing o edit mode
  const state = useLocation().state;

  // Define the state variables
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // Define the navigate function
  const navigate = useNavigate();

  // Define the upload function
  const upload = async () => {
    try {
      // Create a new FormData object and append the file to it
      const formData = new FormData();
      formData.append("file", file);

      // Send a POST request to upload the file
      const res = await axios.post("/upload", formData);

      // Return the filename of the uploaded file
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Define the handleClick function to handle the form submission
  const handleClick = async (e) => {
    e.preventDefault();

    // Upload the image and get the filename
    const imgUrl = await upload();

    try {
      // Send a PUT request to update a post if the location state is defined (writing),
      // otherwise send a POST request to create a new post
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      // Navigate to the homepage after the post is saved or updated
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-2">
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="logo" className="image"/>
        </a>
      </div>
      <div className="add mt-3">
        <div className="content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            placeholder="Add title"

          />

            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
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
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              <FaCamera className="icon" size={30} />
            </label>
          </div>

          <button 
            onClick={handleClick}
            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
          > Publish
          </button>
         
        </div>

       

      </div>  

    </div>
  );
};

export default Write;
