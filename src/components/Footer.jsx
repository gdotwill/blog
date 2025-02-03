import React from "react";
import Logo from "../images/blog.png";

const Footer = () => {
  return (
    <footer>
      <span>
        <br />
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>
      </span>
    </footer>
  );
};

export default Footer;
