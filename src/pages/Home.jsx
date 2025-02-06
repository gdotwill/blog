import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"


import api from "../api/api";
import Categories from "../components/Categories";

import Posts from "../components/Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState([]); // Posts after filtering

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
        setFilteredPosts(res.data); // Initially, show all posts
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []); 

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       // Send the selected category as a query parameter
  //       const response = await api.get('/posts', {
  //         params: { category: selectedCategory },
  //       });
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error("There was an error fetching the posts!", error);
  //     }
  //   };

  //   fetchPosts();
  // }, [selectedCategory]); // Fetch posts whenever the selectedCategory changes

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredPosts(posts); // Show all posts
    } else {
      const filtered = posts.filter((post) => post.category === category);
      setFilteredPosts(filtered); // Show only posts of selected category
    }
  };

  return (
    <>
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange} 
      />

      <Posts posts={filteredPosts} />
    </>
  );
};

export default Home;
