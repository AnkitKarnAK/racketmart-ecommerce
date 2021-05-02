import { createContext, useContext, useReducer } from "react";
import { checkStatus, dataReducer } from "./data-reducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    products: [],
    itemsInCart: [],
    itemsInWishlist: [],
    wishlistedItemsWithStatus: [],
    sortBy: null,
    includeOutOfStock: true,
    showFastDelivery: true,
    priceRange: 1000,
    searchedProduct: "",
  });

  const wishlistedItems = state.wishlistedItemsWithStatus.filter((item) =>
    checkStatus(state.wishlistedItemsWithStatus, item._id)
  );

  const cartItems = state.itemsInCart.filter((item) =>
    checkStatus(state.itemsInCart, item._id)
  );

  return (
    <DataContext.Provider
      value={{ state, dispatch, wishlistedItems, cartItems }}
    >
      {children}
    </DataContext.Provider>
  );
};
