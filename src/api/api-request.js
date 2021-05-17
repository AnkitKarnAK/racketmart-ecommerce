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
    console.log("error occured while adding or removing product from wishlist");
  }
};
