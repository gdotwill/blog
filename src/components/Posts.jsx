import React from 'react'
import { AiOutlineTags } from "react-icons/ai"
import { Link } from "react-router-dom";

const Posts = ({ posts, loading, searchTerm}) => {
  return (
    <div>
        <section className='container blog'>
        {loading ? (
          <h1 className='text-center mt-10 text-3xl'>Loading articles...</h1> 
        ) : posts.length === 0 && searchTerm ? (
          <h1 className='text-center mt-10 text-3xl'>No articles found for "{searchTerm}"</h1> 
        ) : (
          <div className='grid3 mt-8'>
            {posts.map((post) => (
              <div className='box boxItems' key={post.id}>
                <div className='img'>
                  <img src={post.img} alt='image' />
                </div>
                <div className='details'>
                  <div className='tag'>
                    <AiOutlineTags className='icon' />
                    <span>#{post.category}</span>
                  </div>
                  <Link to={`/post/${post.id}`} className='link'>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{post.description.slice(0, 80)}...</p>
                  <Link className="link" to={`/post/${post.id}`}>
                    <p className="font-extrabold">Read More</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Posts
