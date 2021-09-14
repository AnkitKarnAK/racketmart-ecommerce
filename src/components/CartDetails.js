import React from "react";
import { useDataContext } from "../context/data-context";

function CartDetails() {
  const {
    state: { itemsInCart },
  } = useDataContext();

  const totalItems = itemsInCart?.reduce((acc, val) => {
    return val.quantity + acc;
  }, 0);

  const totalItemsPrice = itemsInCart?.reduce((acc, val) => {
    return val.productId.price * val.quantity + acc;
  }, 0);

  const totalPrice =
    totalItemsPrice > 499 ? totalItemsPrice : totalItemsPrice + 49;

  return (
    <>
      <div className="cart-details card-container-horizontal">
        <div className="details-title text-uppercase h3">Price Details</div>
        <div className="item-details-body">
          <div className="item-detail-content">
            <div className="item-detail-key">Actual Price</div>
            <div className="item-detail-value">{totalItemsPrice}</div>
          </div>
          <div className="item-detail-content">
            <div className="item-detail-key">Total Items</div>
            <div className="item-detail-value">{totalItems}</div>
          </div>
          <div className="item-detail-content">
            <div className="item-detail-key">Unique Items</div>
            <div className="item-detail-value">{itemsInCart?.length}</div>
          </div>
          <div className="item-detail-content">
            <div className="item-detail-key">Delivery Charges</div>
            {totalItemsPrice > 499 ? (
              <div className="item-detail-value">
                <del className="text-color-red"> Rs 49</del>{" "}
                <ins className="text-color-green">Free</ins>
              </div>
            ) : (
              <div className="item-detail-value">Rs 49</div>
            )}
          </div>
        </div>
        <div className="price-detail h4">
          <div className="price-key">Total Price</div>
          <div className="price-value">{totalPrice}</div>
        </div>
      </div>
      <div className="order-container">
        <div className="price-title">Price: Rs {totalPrice}</div>
        <button className="order-button button-primary">Place Order</button>
      </div>
    </>
  );
}

export default CartDetails;
