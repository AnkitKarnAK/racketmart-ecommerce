import { ProductItem } from "./ProductItem";

import { useDataContext } from "../context/data-context";
import FilterProducts from "./FilterProducts";

function Products() {
  const {
    state: { products, sortBy, includeOutOfStock, showFastDelivery },
  } = useDataContext();

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

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    includeOutOfStock,
    showFastDelivery,
  });

  return (
    <div>
      <FilterProducts />
      <div className="h2 text-center">
        Available Products: {filteredData.length}
      </div>

      <div className="product-container">
        {filteredData.map((item) => {
          return <ProductItem key={item.id} productItem={item} />;
        })}
      </div>
    </div>
  );
}

export default Products;
