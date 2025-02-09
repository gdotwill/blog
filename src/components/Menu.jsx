
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

// Defining a functional component named Menu which takes a single prop named cat
const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 

  // useEffect hook is used to fetch posts related to the category
  useEffect(() => {
    // Defining an async function fetchData to fetch posts related to the category using axios
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts/?cat=${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // Calling fetchData function to fetch data when component is mounted or when category is changed
    fetchData();
  }, [category]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {
        posts.length < 1 && (
          <h1>Loading ...</h1>
        )
      }
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="post cover" />
          <h2>{post.title}</h2>
          {/* Using Link component to navigate to the post */}
          <Link to={`/post/${post.id}`}>
            <button
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;

