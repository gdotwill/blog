import React from "react";

import { images } from "../constants";
import Search from "./Search";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col py-5 lg:flex-row">
        <div className="mt-10 lg:w-1/2">
            <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
            Read the most interesting articles
            </h1>
            <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
            <Search className="mt-10 lg:mt-6 xl:mt-10" />
        </div>
        <div className="hidden lg:block lg:1/2">
            <img
            className="w-full"
            src={images.HeroImage}
            alt="users are reading articles"
            />
        </div>
    </section>
  );
};

export default Hero;
