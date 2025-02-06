import React, { useEffect, useState } from "react";

const Categories = ({ selectedCategory, setSelectedCategory }) => {

    const categories = ['All', 'Art', 'Science', 'Food'];
    
    return (
        <div className='container mx-auto'>
            <div className="flex mt-5 flex-col lg:flex-row lg:items-center lg:flex-nowrap lg:gap-x-4 lg:mt-10">
                <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-1">
                    <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
                        {
                            categories.map((category) => (
                                <button 
                                    key={category}
                                    className={`mt-5 
                                    lg:mt-0 border-2
                                    border-blue-500 
                                    px-6 
                                    py-2 
                                    rounded-full
                                    text-blue-500 
                                    font-semibold
                                    hover:bg-blue-500
                                    hover:text-white 
                                    transition-all duration-300
                                    `}

                                    style={{
                        
                                      backgroundColor: selectedCategory === category ? 'rgb(59 130 246 / var(--tw-bg-opacity, 1))' : '#fff',
                                      color: selectedCategory === category ? 'white' : 'rgb(59 130 246 / var(--tw-bg-opacity, 1))',
                                      cursor: 'pointer',
                                    }}

                                    onClick={() => setSelectedCategory(category)}
                                
                                >
                                    <h6>{category}</h6>
                                </button>

                            ))
                        }
                        
                    </ul>   
                </div>
            </div>
        </div>

    )
}

export default Categories
