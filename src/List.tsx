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
  const [totalProducts, setTotalProducts] = useState<number>();
  const [pageCount, setPageCount] = useState<number>();
  const [searchId, setSearchId] = useState<number | null>(null);
  const [error, setError] = useState<any | null>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const itemsPerPage: number = 5;

  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  useEffect(() => {
    (async function requestTotalItems() {
      try {
        const res = await fetch(`https://reqres.in/api/products`);
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
        const json = await res.json();

        let totalProductsL = json.total;
        let pageCountL = Math.ceil(totalProductsL / itemsPerPage);

        setPageCount(pageCountL);
        setTotalProducts(totalProductsL);

        const pageParam = Number(searchParams.get("page"));
        const searchIdParam = Number(searchParams.get("id"));

        if (pageParam) {
          if (pageParam > 0 && pageParam <= pageCountL) {
            setCurrPage(pageParam);
          } else {
            throw new Error("Page not found");
          }
        } else if (searchIdParam) {
          if (searchIdParam > 0 && searchIdParam <= totalProductsL) {
            setSearchId(searchIdParam);
          } else {
            throw new Error("Id not found");
          }
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const pageParam = Number(searchParams.get("page"));
      const searchIdParam = Number(searchParams.get("id"));

      if (pageParam && pageCount) {
        if (pageParam > 0 && pageParam <= pageCount) {
          setCurrPage(pageParam);
        } else {
          setError(Error("Page not found"));
        }
      } else if (searchIdParam && totalProducts) {
        if (searchIdParam > 0 && searchIdParam <= totalProducts) {
          setSearchId(searchIdParam);
        } else {
          setError(Error("Id not found"));
        }
      }
    } else {
      isMounted.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    requestItems();
  }, [currPage, searchId]);

  async function requestItems() {
    let res;
    if (searchId && totalProducts) {
      if (searchId > 0 && searchId <= totalProducts) {
        try {
          res = await fetch(`https://reqres.in/api/products?id=${searchId}`);
          if (!res.ok) {
            throw new Error(`${res.status}`);
          }
          const json = await res.json();
          setproducts([json.data]);
        } catch (error) {
          setError(error);
        }
      } else {
        setError(Error("Id not found"));
      }
    } else {
      try {
        res = await fetch(
          `https://reqres.in/api/products?per_page=5&page=${currPage}`
        );
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }
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
          An error has occured during loading the products.
          <br /> Error: {error.message}
          <br />
          <button
            onClick={() => {
              setError(null);
              setSearchParams({ page: "1" });
            }}
          >
            Home Page
          </button>
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
              if (e.target.value && e.target.value !== "") {
                setSearchParams({ id: e.target.value });
              } else {
                setSearchParams({ page: "1" });
              }
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
              if (pageCount && currPage < pageCount && !searchId) {
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
