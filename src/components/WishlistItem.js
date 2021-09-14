import { useDataContext } from "../context/data-context";
import { isAlreadyAdded2 } from "../context/data-reducer";
import deleteIcon from "../assests/trash.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addOrRemoveProductFromWishlist,
  addProductToCart,
} from "../api/api-request";
import { useAuthContext } from "../context/auth-context";
import { useState } from "react";
import Loader from "react-loader-spinner";

export const WishlistItem = ({ wishlistItem, activeStatus }) => {
  const { dispatch, state } = useDataContext();
  const { userId } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
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
                setIsLoading(true);
                const { response } = await addOrRemoveProductFromWishlist({
                  userId,
                  productItem: wishlistItem,
                });
                dispatch({
                  type: "GET_WISHLIST",
                  payload: response.data.wishlist,
                });
                setIsLoading(false);
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
          {isAlreadyAdded2(state.itemsInCart, wishlistItem._id) ? (
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
                (async () => {
                  setIsLoading(true);
                  const { response: cartResponse } = await addProductToCart({
                    userId,
                    productItem: wishlistItem,
                  });
                  const { response: wishlistResponse } =
                    await addOrRemoveProductFromWishlist({
                      userId,
                      productItem: wishlistItem,
                    });

                  dispatch({
                    type: "GET_CART",
                    payload: cartResponse.data.cart,
                  });
                  dispatch({
                    type: "GET_WISHLIST",
                    payload: wishlistResponse.data.wishlist,
                  });

                  setIsLoading(false);
                  toast.success(`${wishlistItem.name} moved to Cart`);
                })();
              }}
            >
              Move to Cart
            </button>
          )}
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
