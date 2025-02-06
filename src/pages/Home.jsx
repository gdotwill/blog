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
    filterPosts(category, searchTerm);

    // if (category === 'All') {
    //   setFilteredPosts(posts); // Show all posts
    // } else {
    //   const filtered = posts.filter((post) => post.category === category);
    //   setFilteredPosts(filtered); // Show only posts of selected category
    // }
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

      <Posts posts={filteredPosts} />
    </>
  );
};

export default Home;
