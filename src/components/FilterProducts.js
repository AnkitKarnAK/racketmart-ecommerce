import { useDataContext } from "../context/data-context";

function FilterProducts() {
  const {
    dispatch,
    state: {
      sortBy,
      includeOutOfStock,
      showFastDelivery,
      priceRange,
      searchedProduct,
    },
  } = useDataContext();

  return (
    <div style={{ maxWidth: "30rem", margin: "1rem auto" }}>
      <div
        className="text-right h4 primary-color"
        style={{ padding: " 0 0.5rem", margin: "0", cursor: "pointer" }}
        onClick={() => {
          dispatch({ type: "CLEAR_FILTER" });
        }}
      >
        Clear
      </div>
      <fieldset
        style={{
          borderColor: "#2874f0",
          borderStyle: "solid",
        }}
      >
        <legend>Search</legend>
        <div className="input-box search-box">
          <input
            className="effect-1"
            type="text"
            placeholder="Search your product"
            value={searchedProduct}
            onChange={(e) =>
              dispatch({ type: "SEARCH_FILTER", payload: e.target.value })
            }
          />
          <span className="focus-border"></span>
        </div>
      </fieldset>

      <fieldset
        style={{
          marginTop: "1rem",
          borderColor: "#2874f0",
          borderStyle: "solid",
        }}
      >
        <legend>Sort By</legend>

        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT_BY", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          Price - Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT_BY", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          Price - High to Low
        </label>
      </fieldset>

      <fieldset
        style={{
          marginTop: "1rem",
          borderColor: "#2874f0",
          borderStyle: "solid",
        }}
      >
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            checked={includeOutOfStock}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFastDelivery}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
        <label style={{ display: "block", marginTop: "1rem" }}>
          Maximum Price:
          <input
            type="range"
            min={200}
            step={100}
            max={2500}
            value={priceRange}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE_RANGE", payload: e.target.value })
            }
          />
          <span>{priceRange}</span>
        </label>
      </fieldset>
    </div>
  );
}

export default FilterProducts;
