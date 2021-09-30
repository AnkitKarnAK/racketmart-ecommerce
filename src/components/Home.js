import React from "react";
import { Link } from "react-router-dom";
import bannerImg1 from "../assests/banner.jpg";
import { landingProducts } from "../utils/landingProducts";
import { ProductItem } from "./ProductItem";

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
        <div className="product-container">
          {landingProducts.map((item) => {
            return <ProductItem key={item._id} productItem={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
