import { Link, NavLink } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import cartIcon from "../assests/cart-icon.svg";
import heartIcon from "../assests/heart-outline.svg";
import userLoginIcon from "../assests/user-login.svg";
import homeIcon from "../assests/home-icon.svg";
import profileIcon from "../assests/profile-icon.svg";
import badmintonSvgIcon from "../assests/badminton.svg";
import { useAuthContext } from "../context/auth-context";

export const Navbar = () => {
  const { wishlistedItems, cartItems } = useDataContext();
  const { isUserLogin, logoutUser } = useAuthContext();

  return (
    <>
      <nav className="nav">
        <div id="menuToggle">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <Link to="/">
              <li>
                <img src={homeIcon} alt="home" className="nav-icons" />
                Home
              </li>
            </Link>
            <Link to="/products">
              <li>
                <img
                  src={badmintonSvgIcon}
                  alt="products"
                  className="nav-icons"
                />
                Products
              </li>
            </Link>
            <Link to="/profile">
              <li>
                <img src={profileIcon} alt="profile" className="nav-icons" />
                Profile
              </li>
            </Link>
            <li className="menu-logout-container">
              {isUserLogin && (
                <button
                  onClick={logoutUser}
                  className="menu-logout-button button-primary"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <NavLink to="/" className="nav-header">
          <span className="nav-header-secondary">Racket</span>
          <span className="nav-header-primary">Mart</span>
        </NavLink>
        <div className="nav-links">
          <div className="button-badge-container display-toggle">
            <button className="nav-button">
              <NavLink
                to="/products"
                className="nav-icon-container"
                activeClassName="nav-link-active"
              >
                <img
                  src={badmintonSvgIcon}
                  alt="Products"
                  className="nav-icons"
                />
                Products
              </NavLink>
            </button>
          </div>
          {isUserLogin ? (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/wishlist"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img src={heartIcon} alt="Wishlist" className="nav-icons" />
                    Wishlist
                  </NavLink>
                </button>
                {wishlistedItems.length > 0 && (
                  <div className="icon-badge">{wishlistedItems.length}</div>
                )}
              </div>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/cart"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img src={cartIcon} className="nav-icons" alt="Cart" />
                    Cart
                  </NavLink>
                </button>
                {cartItems.length > 0 && (
                  <div className="icon-badge">{cartItems.length}</div>
                )}
              </div>
              <div className="button-badge-container display-toggle">
                <button className="nav-button">
                  <NavLink
                    to="/profile"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img
                      src={profileIcon}
                      alt="Profile"
                      className="nav-icons"
                    />
                    Profile
                  </NavLink>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="button-badge-container display-toggle-mobile">
                <button className="nav-button">
                  <NavLink
                    to="/products"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img
                      src={badmintonSvgIcon}
                      alt="Products"
                      className="nav-icons"
                    />
                    Products
                  </NavLink>
                </button>
              </div>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/login"
                    className="nav-icon-container"
                    activeClassName="nav-link-active"
                  >
                    <img src={userLoginIcon} alt="" className="nav-icons" />
                    Login
                  </NavLink>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
