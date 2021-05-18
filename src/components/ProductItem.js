import { useDataContext } from "../context/data-context";
import { checkStatus, isAlreadyAdded2 } from "../context/data-reducer";
import { Link, useNavigate } from "react-router-dom";
import heartOutline from "../assests/heart-outline-bold.svg";
import heartSolid from "../assests/heart-solid.svg";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/auth-context";
import { addOrRemoveProductFromWishlist } from "../api/api-request";
import { useState } from "react";
import Loader from "react-loader-spinner";

export const ProductItem = ({ productItem }) => {
  const { state, dispatch } = useDataContext();
  const { userId, isUserLogin } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="card-container">
        <div
          className={
            productItem.inStock ? "card-image" : "card-image outofstock"
          }
        >
          <img src={productItem.image} alt={productItem.name} />
          <div
            className={
              productItem.inStock ? "card-badge new" : "card-badge outofstock"
            }
          >
            {productItem.inStock ? "New" : "Out of Stock"}
          </div>

          {isAlreadyAdded2(state.itemsInWishlist, productItem._id) ? (
            <div
              className="wishlist-icon-container"
              onClick={() => {
                isUserLogin
                  ? (async () => {
                      setIsLoading(true);
                      const { response } = await addOrRemoveProductFromWishlist(
                        {
                          userId,
                          productItem,
                        }
                      );
                      dispatch({
                        type: "GET_WISHLIST",
                        payload: response.data.wishlist,
                      });
                      setIsLoading(false);
                      toast.error(`${productItem.name} removed from Wishlist`);
                    })()
                  : navigate("/login");
              }}
            >
              <img src={heartSolid} alt="liked" className="wishlist-icon" />
            </div>
          ) : (
            <div
              className="wishlist-icon-container"
              onClick={() => {
                isUserLogin
                  ? (async () => {
                      setIsLoading(true);
                      const { response } = await addOrRemoveProductFromWishlist(
                        {
                          userId,
                          productItem,
                        }
                      );
                      dispatch({
                        type: "GET_WISHLIST",
                        payload: response.data.wishlist,
                      });
                      setIsLoading(false);
                      toast.info(`${productItem.name} added to Wishlist`);
                    })()
                  : navigate("/login");
              }}
            >
              <img src={heartOutline} alt="like" className="wishlist-icon" />
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="h3 text-center">{productItem.name}</div>
          <div className="card-content">
            <p>
              Rs {productItem.price}{" "}
              <span style={{ color: "#878787" }}>
                <del> Rs {productItem.totalPrice} </del>
              </span>
              <span className="primary-color"> {productItem.discount}</span>
            </p>
            <p>
              Rating:{" "}
              <span
                className={
                  productItem.rating < 4 ? "text-color-red" : "text-color-green"
                }
              >
                {productItem.rating}★
              </span>
            </p>
            <div>
              {productItem.fastDelivery
                ? "Delivery : Fast Delivery"
                : "Delivery : 3 days minimum"}
            </div>
          </div>
          {checkStatus(state.itemsInCart, productItem._id) ? (
            <Link to="/cart">
              <button className="button-secondary link-button">
                Go to Cart
              </button>
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
      {isLoading && (
        <div className="position-bottom-right">
          <Loader type="Oval" color="#2874f0" height={50} width={50} />
        </div>
      )}
    </>
  );
};
