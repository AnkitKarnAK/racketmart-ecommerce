import axios from "axios";

export const getProductsFromServer = async ({ url, requestType }) => {
  switch (requestType) {
    case "GET": {
      const res = await axios.get(url);
      if (res.status === 200) {
        return { response: res };
      }
      break;
    }
    default:
      return null;
  }
};
