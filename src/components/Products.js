import { ProductItem } from "./ProductItem";

import { useDataContext } from "../context/data-context";
import FilterProducts from "./FilterProducts";

function Products() {
  const {
    state: {
      products,
      sortBy,
      includeOutOfStock,
      showFastDelivery,
      priceRange,
      searchedProduct,
    },
  } = useDataContext();

  function getSearchedData(productList, searchedProduct) {
    return productList.filter((product) =>
      product.name.toLowerCase().includes(searchedProduct.toLowerCase())
    );
  }

  function getSortedData(productList, sortBy) {
    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return [...productList].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "PRICE_LOW_TO_HIGH") {
      return [...productList].sort((a, b) => Number(a.price) - Number(b.price));
    } else return productList;
  }

  function getFilteredData(
    productList,
    { showFastDelivery, includeOutOfStock }
  ) {
    return productList
      .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
      .filter(({ inStock }) => (includeOutOfStock ? true : inStock));
  }

  function getRangedData(productList, priceRange) {
    return productList.filter(
      (productItem) => Number(productItem.price) < priceRange
    );
  }
  const searchedData = getSearchedData(products, searchedProduct);
  const sortedData = getSortedData(searchedData, sortBy);
  const filteredData = getFilteredData(sortedData, {
    includeOutOfStock,
    showFastDelivery,
  });
  const rangedData = getRangedData(filteredData, priceRange);

  return (
    <div>
      <FilterProducts />
      <div className="h2 text-center">
        Available Products: {rangedData.length}
      </div>

      <div className="product-container">
        {rangedData.map((item) => {
          return <ProductItem key={item._id} productItem={item} />;
        })}
      </div>
    </div>
  );
}

export default Products;
