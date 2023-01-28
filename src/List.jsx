import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";

const List = () => {
  const [products, setproducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const inputRef = useRef();

  useEffect(() => {
    requestItems();
  }, [currPage]);

  async function requestItems() {
    let res;
    if (inputRef.current.value) {
      if (inputRef.current.value > 0 && inputRef.current.value < 13) {
        res = await fetch(
          `https://reqres.in/api/products?id=${inputRef.current.value}`
        );
        const json = await res.json();
        setproducts([json.data]);
      } else {
        setproducts([]);
      }
    } else {
      res = await fetch(
        `https://reqres.in/api/products?per_page=5&page=${currPage}`
      );
      const json = await res.json();
      setproducts(json.data);
    }
  }

  return (
    <div className="List">
      <form>
        <label htmlFor="search">Search by ID</label>
        <input
          type="number"
          ref={inputRef}
          onChange={() => {
            requestItems();
          }}
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>YEAR</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </tbody>
      </table>
      <nav>
        <button
          onClick={() => {
            if (currPage > 1 && !inputRef.current.value) {
              setCurrPage(currPage - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currPage < 3 && !inputRef.current.value) {
              setCurrPage(currPage + 1);
            }
          }}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default List;
