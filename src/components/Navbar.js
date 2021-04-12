import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/data-context";
import cartIcon from "../assests/cart-icon.svg";
import heartIcon from "../assests/heart-outline.svg";
import badmintionSvgIcon from "../assests/badminton.svg";

export const Navbar = () => {
  const { wishlistedItems, cartItems } = useDataContext();

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-header">
          <span className="nav-header-secondary">Racket</span>
          <span className="nav-header-primary">Mart</span>
        </NavLink>
        <div className="nav-links">
          <div className="button-badge-container">
            <button className="nav-button">
              <NavLink
                to="/products"
                className="nav-icon-container"
                activeClassName="nav-link-active"
              >
                <img src={badmintionSvgIcon} alt="" className="nav-icons" />
                Products
              </NavLink>
            </button>
          </div>
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
        </div>
      </nav>
    </>
  );
};
