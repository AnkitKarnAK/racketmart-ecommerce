import React from "react";
import { useDataContext } from "../context/data-context";
import WishlistEmpty from "./WishlistEmpty";
import { WishlistItem } from "./WishlistItem";

const Wishlist = () => {
  const { state } = useDataContext();

  return (
    <div>
      {state.itemsInWishlist?.length > 0 ? (
        <div className="wishlist-container">
          {state.itemsInWishlist.map((item) => (
            <WishlistItem
              key={item._id}
              wishlistItem={item.productId}
              activeStatus={item.active}
            />
          ))}
        </div>
      ) : (
        <WishlistEmpty />
      )}
    </div>
  );
};

export default Wishlist;
