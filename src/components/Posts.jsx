import React from 'react'
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom";


const Posts = ({ posts}) => {
  return (
    <div>
        <section className='container blog'>
          {
            posts.length < 1 && (
              <div className='mt-16 text-center'>
                <h1 className='text-3xl'>Loading posts...</h1>
              </div>     
            )
          }
          <div className='grid3 mt-8'>
            {posts.map((post) => (
              <div className='box boxItems' key={post.id}>
                <div className='img'>
                  <img src={`http://localhost:3000${post.img}`} alt='' />
                </div>
                <div className='details'>
                  <div className='tag'>
                    <AiOutlineTags className='icon' />
                    <a href='/'>#{post.category}</a>
                  </div>
                  <Link to={`/details/${post.id}`} className='link'>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{post.description.slice(0, 80)}...</p>
                  <Link className="link" to={`/post/${post.id}`}>
                    <p className="font-extrabold">Read More</p>
                  </Link>
                  {/* <p>{post.description}</p> */}
                  {/* <div className='date'>
                    <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{post.date}</label>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
      </section>
      
    </div>
  )
}

export default Posts
