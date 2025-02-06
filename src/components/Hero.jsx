import React from "react";

import { images } from "../constants";
import Search from "./Search";

const Hero = ({ searchTerm, handleSearchChange, handleSearchButtonClick, setSearchTerm }) => {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row">
        <div className="mt-10 lg:w-1/2">
          <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
            Read the most interesting articles
          </h1>    
        </div>
        <div className="mt-10 lg:w-1/2">
          <Search 
            searchTerm={searchTerm} 
            handleSearchChange={handleSearchChange}
            handleSearchButtonClick={handleSearchButtonClick}
            setSearchTerm={setSearchTerm}
            className="mt-10 lg:mt-3 xl:mt-8" 
          />
        </div>
    </section>
  );
};

export default Hero;
