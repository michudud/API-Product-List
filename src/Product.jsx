import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Product = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <tr
        style={{ backgroundColor: product.color }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <th>{product.id}</th>
        <th>{product.name}</th>
        <th>{product.year}</th>
      </tr>
      {showModal ? (
        <Modal>
          <ul>
            <li>Id:{product.id}</li>
            <li>Name:{product.name}</li>
            <li>Year:{product.year}</li>
            <li>Color:{product.color}</li>
            <li>Pantone:{product.pantone_value}</li>
          </ul>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </button>
        </Modal>
      ) : null}
    </>
  );
};

export default Product;
