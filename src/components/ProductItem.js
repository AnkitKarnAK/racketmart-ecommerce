import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";
import { Link } from "react-router-dom";
import heartOutline from "../assests/heart-outline-bold.svg";
import heartSolid from "../assests/heart-solid.svg";
import { toast } from "react-toastify";

export const ProductItem = ({ productItem }) => {
  const { state, dispatch } = useDataContext();

  return (
    <div className="card-container">
      <div
        className={productItem.inStock ? "card-image" : "card-image outofstock"}
      >
        <img src={productItem.image} alt={productItem.name} />
        <div
          className={
            productItem.inStock ? "card-badge new" : "card-badge outofstock"
          }
        >
          {productItem.inStock ? "New" : "Out of Stock"}
        </div>

        {checkStatus(state.wishlistedItemsWithStatus, productItem.id) ? (
          <div
            className="wishlist-icon-container"
            onClick={() => {
              dispatch({ type: "ADD_TO_WISHLIST", payload: productItem });
              toast.dark(`${productItem.name} removed from Wishlist`);
            }}
          >
            <img src={heartSolid} alt="liked" className="wishlist-icon" />
          </div>
        ) : (
          <div
            className="wishlist-icon-container"
            onClick={() => {
              dispatch({ type: "ADD_TO_WISHLIST", payload: productItem });
              toast.info(`${productItem.name} added to Wishlist`);
            }}
          >
            <img src={heartOutline} alt="like" className="wishlist-icon" />
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="h3">{productItem.name}</div>
        <div className="card-content">
          <p>
            Rs {productItem.price}{" "}
            <span className="primary-color">{productItem.offer}</span>
          </p>
          <div>
            {productItem.fastDelivery
              ? "Delivery : Fast Delivery"
              : "Delivery : 3 days minimum"}
          </div>
        </div>
        {checkStatus(state.itemsInCart, productItem.id) ? (
          <Link to="/cart">
            <button className="button-secondary link-button">Go to Cart</button>
          </Link>
        ) : (
          <button
            disabled={!productItem.inStock}
            className={
              productItem.inStock
                ? "button-primary"
                : "button-primary button-disabled"
            }
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: productItem });
              toast.success(`${productItem.name} added to Cart`);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
