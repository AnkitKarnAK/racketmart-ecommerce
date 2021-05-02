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
