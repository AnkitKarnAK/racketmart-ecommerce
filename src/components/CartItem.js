import heartSolid from "../assests/heart-solid.svg";
import heartOutline from "../assests/heart-outline.svg";
import deleteIcon from "../assests/trash.svg";
import { useDataContext } from "../context/data-context";
import { checkStatus } from "../context/data-reducer";

export const CartItem = ({ cartItem }) => {
  const { state, dispatch } = useDataContext();
  return (
    <div className="card-container-horizontal">
      <div className="card-horizontal-image">
        <img src={cartItem.image} alt={cartItem.name} />
      </div>
      <div className="card-badge">New</div>

      <div
        className="wishlist-icon-container"
        onClick={() => {
          dispatch({ type: "ADD_TO_WISHLIST", payload: cartItem });
        }}
      >
        {checkStatus(state.wishlistedItemsWithStatus, cartItem.id) ? (
          <img src={heartSolid} alt="liked" className="wishlist-icon" />
        ) : (
          <img src={heartOutline} alt="like" className="wishlist-icon" />
        )}
      </div>

      {/* <div className="card-dismiss">X</div> */}
      <div className="card-body-horizontal">
        <div className="h3">{cartItem.name}</div>
        <div className="card-content-horizontal">
          <p>
            Rs {cartItem.price}{" "}
            <span className="primary-color">{cartItem.offer}</span>
          </p>
          <div>
            {cartItem.fastDelivery
              ? "Delivery : Fast Delivery"
              : "Delivery : 3 days minimum"}
          </div>
        </div>
        <div className="cart-buttons">
          {cartItem.quantity > 1 ? (
            <button
              className="count-button button-secondary"
              onClick={() => {
                dispatch({
                  type: "DECREMENT_CART_QUANTITY",
                  payload: cartItem,
                });
              }}
            >
              -
            </button>
          ) : (
            <div
              className="delete-icon"
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: cartItem });
              }}
            >
              <img src={deleteIcon} alt="" srcset="" />
            </div>
          )}
          <div className="cartitem-quantity">{cartItem.quantity}</div>
          <button
            className="button-secondary count-button"
            onClick={() => {
              dispatch({ type: "INCREMENT_CART_QUANTITY", payload: cartItem });
            }}
          >
            +
          </button>
          <button
            className="remove-cart-button button-primary"
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: cartItem });
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
