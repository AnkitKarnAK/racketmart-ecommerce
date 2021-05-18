import React from "react";
import { useAuthContext } from "../context/auth-context";
import profilePicIcon from "../assests/profile-round-border-icon.svg";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data-context";

const Profile = () => {
  const { username, logoutUser } = useAuthContext();
  const {
    state: { itemsInCart, itemsInWishlist },
  } = useDataContext();

  return (
    <div className="profile-container">
      <h1>Profile page </h1>
      <div className="profile-user-info">
        <img className="avatar" src={profilePicIcon} alt="Profile" />{" "}
        <span className="profile-user-name">{username}</span>
      </div>
      <div className="profile-links">
        <Link to="/wishlist">
          Wishlist:{" "}
          <span className="profile-links-content">{`${itemsInWishlist?.length} Products`}</span>
        </Link>
        <Link to="/cart">
          Cart:{" "}
          <span className="profile-links-content">{`${itemsInCart?.length} Products`}</span>
        </Link>
        <Link to="/address">Address</Link>
      </div>
      <div className="profile-logout-container">
        <button
          onClick={logoutUser}
          className="button-primary profile-logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
