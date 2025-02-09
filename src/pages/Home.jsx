import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"


import api from "../api/api";
import Categories from "../components/Categories";

import Posts from "../components/Posts";

import Hero from "../components/Hero";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState([]); // Posts after filtering

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [searchTerm, setSearchTerm] = useState(''); // New state to store the search term

  const [loading, setLoading] = useState(false); // Loading state


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
        setFilteredPosts(res.data); // Initially, show all posts
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        // Reset loading state after the request is completed
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterPosts(category, searchTerm);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterPosts(selectedCategory, event.target.value);
  };

  const filterPosts = (category, search) => {
    let filtered = posts;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((post) => post.category === category);
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const handleSearchButtonClick = () => {
    filterPosts(selectedCategory, searchTerm);
  };

  return (
    <>
      <Hero 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange}
        handleSearchButtonClick={handleSearchButtonClick}
        setSearchTerm={setSearchTerm}
      />
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange} 
      />
      <Posts 
        loading={loading} 
        setLoading={setLoading} 
        posts={filteredPosts} 
        searchTerm={searchTerm}/>
    </>
  );
};

export default Home;
