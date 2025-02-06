import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"


import api from "../api/api";

const Home = () => {
  // Declaring a state variable called posts and initializing it to an empty array
  const [posts, setPosts] = useState([]);

  // Getting the current URL query string (if any) using the useLocation hook from react-router-dom
  const cat = useLocation().search;

  // Defining an effect that runs when the cat variable changes
  useEffect(() => {
    // Defining an asynchronous function called fetchData
    const fetchData = async () => {
      try {
        // Making an HTTP GET request to the server to retrieve posts data based on the cat variable
        const res = await api.get(`/posts${cat}`);
        // Updating the posts state variable with the retrieved data
        setPosts(res.data);
      } catch (err) {
        // Logging any errors that occur during the request
        console.log(err);
      }
    };
    // Calling the fetchData function
    fetchData();
  }, [cat]); // Specifying that this effect should only run when the cat variable changes

  // Defining a helper function called getText that takes an HTML string and returns the text content
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Rendering the Home component
  return (
    <section className='blog'>
        <div className='container grid3'>
          {posts.map((post) => (
            <div className='box boxposts' key={post.id}>
              <div className='img'>
                <img src={`http://localhost:3000${post.img}`} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#{post.cat}</a>
                </div>
                <Link to={`/details/${post.id}`} className='link'>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.description.slice(0, 80)}...</p>
                <Link className="link" to={`/post/${post.id}`}>
                  <p className="font-extrabold">Read More</p>
                </Link>
                {/* <p>{post.description}</p> */}
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{post.date}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    // <div className="home">
    //   <div className="posts">
    //     {/* Mapping over the posts state variable and rendering a Post component for each post */}
    //     {posts.map((post) => (
    //       <div className="post" key={post.id}>
    //         <div className="post-img">
    //           {/* Rendering the post image */}
    //           {/* <img src={`../upload/${post.img}`} alt="post cover" /> */}
    //         </div>
    //         <div className="content">
    //           {/* Rendering a link to the post page */}
    //           <Link className="link" to={`/post/${post.id}`}>
    //             <h1>{post.title}</h1>
    //           </Link>
    //           {/* Rendering the post description */}
    //           <p>{getText(post.description)}</p>
    //           {/* Rendering a button to read more */}
    //           <Link className="link" to={`/post/${post.id}`}>
    //             <button>Read More</button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;
