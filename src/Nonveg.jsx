import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";

function Nonveg() {
  const nonVegItems = useSelector((state) => state.Products.NonVeg);
  const dispatch = useDispatch();

  // State for search, price filters, and pagination.
  const [search, setSearch] = useState("");
  const [price100to200, setPrice100to200] = useState(false);
  const [price200to300, setPrice200to300] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 2;

  // 1. Filter items based on the search query.
  let filteredItems = nonVegItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Apply price filtering if either checkbox is checked.
  if (price100to200 || price200to300) {
    filteredItems = filteredItems.filter((item) => {
      const inFirstRange = price100to200 && item.price >= 100 && item.price <= 200;
      const inSecondRange = price200to300 && item.price > 200 && item.price <= 300;
      return inFirstRange || inSecondRange;
    });
  }

  // 3. Pagination logic.
  const totalPages = Math.ceil(filteredItems.length / perPage);
  const pageEndItemIndex = perPage * pageNumber;
  const pageStartItemIndex = pageEndItemIndex - perPage;
  const paginatedItems = filteredItems.slice(pageStartItemIndex, pageEndItemIndex);

  const handlePageNumber = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  return (
    <>
      {/* Price Filter Checkboxes */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={price100to200}
            onChange={(e) => {
              setPrice100to200(e.target.checked);
              setPageNumber(1); // Reset to first page when filter changes.
            }}
          />
          100-200
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={price200to300}
            onChange={(e) => {
              setPrice200to300(e.target.checked);
              setPageNumber(1); // Reset to first page when filter changes.
            }}
          />
          200-300
        </label>
      </div>
      <br />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPageNumber(1); // Reset to first page when search changes.
        }}
      />
      <br /><br />

      {/* Product List */}
      <ul>
        <h3>
          {(search || price100to200 || price200to300) ? "Filtered Products:" : "All Products:"}
        </h3>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <li className="labels" key={index}>
              {item.name} - {item.price}
              <button onClick={() => dispatch(addToCart(item))}>Add to cart</button>
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => handlePageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
          Previous
        </button>
        <button
          onClick={() => handlePageNumber(pageNumber + 1)}
          disabled={pageNumber === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageNumber(page)}
            className="page"
            style={{ fontWeight: pageNumber === page ? "bold" : "normal" }}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

export default Nonveg;
