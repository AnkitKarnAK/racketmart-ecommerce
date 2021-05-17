import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";
import deleteIcon from "../assests/trash.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrRemoveProductFromWishlist } from "../api/api-request";
import { useAuthContext } from "../context/auth-context";

export const WishlistItem = ({ wishlistItem, activeStatus }) => {
  const { dispatch, state } = useDataContext();
  const { userId } = useAuthContext();
  return (
    <div className="card-container">
      <div
        className={
          wishlistItem.inStock ? "card-image" : "card-image outofstock"
        }
      >
        <img src={wishlistItem.image} alt={wishlistItem.name} />
        <div
          className={
            wishlistItem.inStock ? "card-badge new" : "card-badge outofstock"
          }
        >
          {wishlistItem.inStock ? "New" : "Out of Stock"}
        </div>
        <div
          className="delete-icon card-delete"
          onClick={() => {
            (async () => {
              const { response } = await addOrRemoveProductFromWishlist({
                userId,
                productItem: wishlistItem,
              });
              dispatch({
                type: "GET_WISHLIST",
                payload: response.data.wishlist,
              });
              toast.error(`${wishlistItem.name} removed from Wishlist`);
            })();
          }}
        >
          <img src={deleteIcon} alt="" />
        </div>
      </div>
      <div className="card-body">
        <div className="h3">{wishlistItem.name}</div>
        <div className="card-content">
          <p>
            Rs {wishlistItem.price}{" "}
            <span className="primary-color">{wishlistItem.offer}</span>
          </p>
          <div>
            {wishlistItem.fastDelivery
              ? "Delivery : Fast Delivery"
              : "Delivery : 3 days minimum"}
          </div>
        </div>
        {checkStatus(state.itemsInCart, wishlistItem._id) ? (
          <Link to="/cart">
            <button className="button-secondary link-button">
              Already in Cart
            </button>
          </Link>
        ) : (
          <button
            disabled={!wishlistItem.inStock}
            className={
              wishlistItem.inStock
                ? "button-primary"
                : "button-primary button-disabled"
            }
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: wishlistItem });
              dispatch({ type: "ADD_TO_WISHLIST", payload: wishlistItem });
              toast.success(`${wishlistItem.name} moved to Cart`);
            }}
          >
            Move to Cart
          </button>
        )}
      </div>
    </div>
  );
};
