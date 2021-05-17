export const dataReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };

    case "GET_WISHLIST":
      return { ...state, itemsInWishlist: action.payload };

    case "GET_CART":
      return { ...state, itemsInCart: action.payload };

    case "SEARCH_FILTER":
      return { ...state, searchedProduct: action.payload };

    case "SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "TOGGLE_INVENTORY":
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
      };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDelivery: !state.showFastDelivery };

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "CLEAR_FILTER":
      return {
        ...state,
        sortBy: null,
        includeOutOfStock: false,
        showFastDelivery: false,
        priceRange: 2500,
        searchedProduct: "",
      };

    case "ADD_TO_CART":
      return isAlreadyAdded(state.itemsInCart, action.payload._id)
        ? {
            ...state,
            itemsInCart: toggleStatus(state.itemsInCart, action.payload._id),
          }
        : {
            ...state,
            itemsInCart: addNewItem(state.itemsInCart, {
              ...action.payload,
              status: { exists: true },
            }),
          };

    case "ADD_TO_WISHLIST":
      return isAlreadyAdded(state.wishlistedItemsWithStatus, action.payload._id)
        ? {
            ...state,
            wishlistedItemsWithStatus: toggleStatus(
              state.wishlistedItemsWithStatus,
              action.payload._id
            ),
          }
        : {
            ...state,
            wishlistedItemsWithStatus: addNewItem(
              state.wishlistedItemsWithStatus,
              {
                ...action.payload,
                status: { exists: true },
              }
            ),
          };

    case "INCREMENT_CART_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT_CART_QUANTITY":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

export const isAlreadyAdded = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray._id === id) return true;
  }
  return false;
};

export const isAlreadyAdded2 = (itemsArray, id) => {
  if (itemsArray) {
    return itemsArray.find((item) => item.productId._id === id);
  }
  return false;
};

export const toggleStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item._id === id) {
      return { ...item, status: { exists: !item.status.exists } };
    } else {
      return item;
    }
  });
};

export const addNewItem = (itemsArray, item) => [
  ...itemsArray,
  { ...item, quantity: 1 },
];

export const checkStatus = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray._id === id && itemInArray.status.exists) return true;
  }
  return false;
};
