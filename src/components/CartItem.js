import heartSolid from "../assests/heart-solid.svg";
import heartOutline from "../assests/heart-outline.svg";
import deleteIcon from "../assests/trash.svg";
import { useDataContext } from "../context/data-context";
import { isAlreadyAdded2 } from "../context/data-reducer";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/auth-context";
import {
  addOrRemoveProductFromWishlist,
  decreaseProductQtyInCart,
  increaseProductQtyInCart,
  removeProductFromCart,
} from "../api/api-request";
import { useState } from "react";
import Loader from "react-loader-spinner";

export const CartItem = ({ cartItem, quantity }) => {
  const { state, dispatch } = useDataContext();
  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="card-container-horizontal">
        <div className="card-horizontal-image">
          <img src={cartItem.image} alt={cartItem.name} />
        </div>
        <div className="card-badge">New</div>

        {isAlreadyAdded2(state.itemsInWishlist, cartItem._id) ? (
          <div
            className="wishlist-icon-container"
            onClick={() => {
              (async () => {
                setIsLoading(true);
                const { response } = await addOrRemoveProductFromWishlist({
                  userId,
                  productItem: cartItem,
                });
                dispatch({
                  type: "GET_WISHLIST",
                  payload: response.data.wishlist,
                });
                setIsLoading(false);
                toast.dark(`${CartItem.name} removed from Wishlist`);
              })();
            }}
          >
            <img src={heartSolid} alt="liked" className="wishlist-icon" />
          </div>
        ) : (
          <div
            className="wishlist-icon-container"
            onClick={() => {
              (async () => {
                setIsLoading(true);
                const { response } = await addOrRemoveProductFromWishlist({
                  userId,
                  productItem: cartItem,
                });
                dispatch({
                  type: "GET_WISHLIST",
                  payload: response.data.wishlist,
                });
                setIsLoading(false);
                toast.info(`${CartItem.name} added to Wishlist`);
              })();
            }}
          >
            <img src={heartOutline} alt="like" className="wishlist-icon" />
          </div>
        )}

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
            {quantity > 1 ? (
              <button
                className="count-button button-secondary"
                onClick={() => {
                  (async () => {
                    setIsLoading(true);
                    const { response } = await decreaseProductQtyInCart({
                      userId,
                      productItem: cartItem,
                      productQuantity: quantity,
                    });
                    dispatch({
                      type: "GET_CART",
                      payload: response.data.cart,
                    });
                    setIsLoading(false);
                  })();
                }}
              >
                -
              </button>
            ) : (
              <div
                className="delete-icon"
                onClick={() => {
                  (async () => {
                    setIsLoading(true);
                    const { response } = await removeProductFromCart({
                      userId,
                      productItem: cartItem,
                    });
                    dispatch({
                      type: "GET_CART",
                      payload: response.data.cart,
                    });
                    setIsLoading(false);
                    toast.error(`${cartItem.name} removed from Cart`);
                  })();
                }}
              >
                <img src={deleteIcon} alt="" />
              </div>
            )}
            <div className="cartitem-quantity">{quantity}</div>
            <button
              className="button-secondary count-button"
              onClick={() => {
                (async () => {
                  setIsLoading(true);
                  const { response } = await increaseProductQtyInCart({
                    userId,
                    productItem: cartItem,
                    productQuantity: quantity,
                  });
                  dispatch({
                    type: "GET_CART",
                    payload: response.data.cart,
                  });
                  setIsLoading(false);
                })();
              }}
            >
              +
            </button>
            <button
              className="remove-cart-button button-primary"
              onClick={() => {
                (async () => {
                  setIsLoading(true);
                  const { response } = await removeProductFromCart({
                    userId,
                    productItem: cartItem,
                  });
                  dispatch({
                    type: "GET_CART",
                    payload: response.data.cart,
                  });
                  setIsLoading(false);
                  toast.error(`${cartItem.name} removed from Cart`);
                })();
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="position-bottom-right">
          <Loader type="Oval" color="#2874f0" height={50} width={50} />
        </div>
      )}
    </>
  );
};
