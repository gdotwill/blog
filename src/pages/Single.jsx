import React, { useContext, useEffect, useState } from "react";
import EditImage from "../images/edit.png";
import DeleteImage from "../images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import { AuthContext } from "../context/authContext";

import api from "../api/api";

const Single = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false); 

  // The useLocation hook returns the current location object, which contains information about the current URL.
  const location = useLocation();
  // The useNavigate hook returns a navigate function that can be used to navigate to a new location.
  const navigate = useNavigate();

  // Extract the post ID from the current URL.
  const postId = location.pathname.split("/")[2];
  
  const { currentUser } = useContext(AuthContext);

  // Use the useEffect hook to fetch the blog post data from the server when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/${postId}`); 
        setPost(res.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        // Reset loading state after the request is completed
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  // Helper function to extract plain text from an HTML string.
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };


  // Render the blog post.
  return (
    <div className="single mt-14">
      {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="content">
              <img src={post.img} alt="post cover" />
              <div className="user">
                {post.img && <img src={post.img} alt="user" />}
              </div>
              <h1>{post.title}</h1>
              <i>"{getText(post.description)}"</i>
            </div>
            <Menu category={post.category} />
          </>
        )}
    </div>
  );
};

export default Single;
