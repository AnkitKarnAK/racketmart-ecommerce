import React from "react";
import { useDataContext } from "../context/data-context";
import { WishlistItem } from "./WishlistItem";

const Wishlist = () => {
  const { wishlistedItems } = useDataContext();

  return (
    <div>
      <div className="h2 text-center">
        {" "}
        Items in wishlist: {wishlistedItems.length}{" "}
      </div>
      <div className="wishlist-container">
        {wishlistedItems.map((item) => (
          <WishlistItem key={item.id} wishlistItem={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
