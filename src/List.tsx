import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "./Product";

const List = () => {
  const [products, setproducts] = useState<
    | {
        id: number;
        name: string;
        year: number;
        color: string;
        pantone_value: string;
      }[]
    | []
  >([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchId, setSearchId] = useState<number | null>(null);
  const [error, setError] = useState<any | null>();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page"));
    const searchIdParam = Number(searchParams.get("id"));

    if (pageParam || searchIdParam) {
      setCurrPage(pageParam);
      setSearchId(searchIdParam);
    }
  }, [searchParams]);

  useEffect(() => {
    requestItems();
  }, [currPage, searchId]);

  async function requestItems() {
    let res;
    if (searchId) {
      if (searchId > 0 && searchId < 13) {
        try {
          res = await fetch(`https://reqres.in/api/products?id=${searchId}`);
          const json = await res.json();
          setproducts([json.data]);
        } catch (error) {
          setError(error);
        }
      } else {
        setproducts([]);
      }
    } else {
      try {
        res = await fetch(
          `https://reqres.in/api/products?per_page=5&page=${currPage}`
        );
        const json = await res.json();
        setproducts(json.data);
      } catch (error) {
        setError(error);
      }
    }
  }

  if (error) {
    return (
      <div className="error-msg">
        <p>
          An error has occured during loading the products. Please check your
          internet connection and refresh the page.
          <br /> Error: {error.message}
        </p>
      </div>
    );
  } else {
    return (
      <div className="List">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="search">Search by ID</label>
          <input
            type="number"
            ref={inputRef}
            onChange={(e) => {
              if (e.target.value) {
                setSearchParams({ id: e.target.value });
              } else setSearchParams({ page: "1" });
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
              if (currPage > 1 && !searchId) {
                setSearchParams({ page: (currPage - 1).toString() });
              }
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currPage < 3 && !searchId) {
                setSearchParams({ page: (currPage + 1).toString() });
              }
            }}
          >
            Next
          </button>
        </nav>
      </div>
    );
  }
};

export default List;
