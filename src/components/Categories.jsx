import React from 'react';

import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className='container mx-auto'>
        <div className="flex mt-5 flex-col lg:flex-row lg:items-center lg:flex-nowrap lg:gap-x-4 lg:mt-10">
            <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-1">
                <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/"
                    >
                        <h6>ALL</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=art"
                    >
                        <h6>ART</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=science"
                    >
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=technology"
                    >
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=cinema"
                    >
                        <h6>CINEMA</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=design"
                    >
                        <h6>DESIGN</h6>
                    </Link>
                    <Link 
                        className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300" 
                        to="/?cat=food"
                    >
                        <h6>FOOD</h6>
                    </Link>
                    
                </ul>   
            </div>
                
            
        
        </div>

    </div>

  )
}

export default Categories
