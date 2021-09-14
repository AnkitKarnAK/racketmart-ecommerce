import React from "react";
import emptyWishlistIcon from "../assests/empty-wishlist.svg";
import { Link } from "react-router-dom";

function WishlistEmpty() {
  return (
    <div className="no-item-container">
      <div className="no-item-image-container">
        <img src={emptyWishlistIcon} alt="No Items in Wishlist" />
      </div>
      <div className="no-item-content-head">Empty Wishlist </div>
      <div className="no-item-content-text">
        You have no items in your wishlist. Start adding!
      </div>
      <Link to="/products">
        <button className="button-primary"> Shop Now </button>
      </Link>
    </div>
  );
}

export default WishlistEmpty;
