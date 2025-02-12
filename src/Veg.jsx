import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";
import "./App.css";

function Veg() {
  const vegItems = useSelector((state) => state.Products.Veg);
  let dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 2;

  const filteredItems = vegItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPageNumber(1); // Reset to first page on search
        }}
      />

      {/* Product List */}
      <ul>
        <h3>{search ? "Matched Products:" : "All Products:"}</h3>
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

      {/* Pagination */}
      <button onClick={() => handlePageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
        Previous
      </button>
      <button onClick={() => handlePageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>
        Next
      </button>

      {/* Page Numbers */}
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

export default Veg;













