import axios from "axios";

export const getProductsFromServer = async ({ url, requestType }) => {
  switch (requestType) {
    case "GET": {
      const res = await axios.get(url);
      if (res.data.success) {
        return { response: res };
      }
      break;
    }
    default:
      return null;
  }
};

export const addOrRemoveProductFromWishlist = async ({
  userId,
  productItem,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/wishlists/${userId}`,
      {
        _id: productItem._id,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error(
      "error occured while adding or removing product from wishlist",
      err
    );
  }
};

export const addProductToCart = async ({ productItem, userId }) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/carts/${userId}`,
      {
        _id: productItem._id,
        quantity: 1,
        active: true,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occured ", err);
  }
};

export const increaseProductQtyInCart = async ({
  productItem,
  userId,
  productQuantity,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/carts/${userId}`,
      {
        _id: productItem._id,
        quantity: productQuantity + 1,
        active: true,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occured ", err);
  }
};

export const decreaseProductQtyInCart = async ({
  productItem,
  userId,
  productQuantity,
}) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/carts/${userId}`,
      {
        _id: productItem._id,
        quantity: productQuantity - 1,
        active: true,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occured ", err);
  }
};

export const removeProductFromCart = async ({ productItem, userId }) => {
  try {
    const res = await axios.post(
      `https://racketapi.herokuapp.com/carts/${userId}`,
      {
        _id: productItem._id,
        quantity: 0,
        active: false,
      }
    );
    if (res.status === 200 || res.status === 201) {
      return { response: res };
    }
  } catch (err) {
    console.error("error occured ", err);
  }
};
