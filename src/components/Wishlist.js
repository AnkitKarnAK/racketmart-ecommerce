import React from "react";
import { useDataContext } from "../context/data-context";
import WishlistEmpty from "./WishlistEmpty";
import { WishlistItem } from "./WishlistItem";

const Wishlist = () => {
  const { wishlistedItems } = useDataContext();

  return (
    <div>
      {wishlistedItems.length > 0 ? (
        <div className="wishlist-container">
          {wishlistedItems.map((item) => (
            <WishlistItem key={item._id} wishlistItem={item} />
          ))}
        </div>
      ) : (
        <WishlistEmpty />
      )}
    </div>
  );
};

export default Wishlist;
