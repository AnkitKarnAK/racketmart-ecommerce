import React from "react";
import { Link } from "react-router-dom";
import bannerImg1 from "../assests/banner.jpg";

import productImage1 from "../assests/home-badminton-1.jpg";
import productImage2 from "../assests/home-badminton-2.jpg";
import productImage3 from "../assests/home-shuttle-1.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner-image-container">
        <img src={bannerImg1} alt="banner-1" />
        <Link to="/products" className="banner-button-container">
          <button className="button-primary banner-button">Shop now</button>
        </Link>
      </div>
      <div className="home-content-container">
        <div className="h1 home-content-title">
          Top Badminton Rackets & Shuttle
        </div>
        <div className="home-content-grid">
          <Link to="/products">
            <div className="grid-item-image">
              <img src={productImage1} alt="Badminton Racket" />
            </div>
          </Link>
          <Link to="/products">
            <div className="grid-item-image">
              <img src={productImage2} alt="Badmintion Racket with bag" />
            </div>
          </Link>
          <Link to="/products">
            <div className="grid-item-image">
              <img src={productImage3} alt="Shuttle" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
