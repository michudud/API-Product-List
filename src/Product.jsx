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
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.year}</td>
      </tr>
      {showModal ? (
        <Modal>
          <table className="details-table">
            <tbody>
              <tr>
                <th>Id</th>
                <td>{product.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th>Year</th>
                <td>{product.year}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{product.color}</td>
              </tr>
              <tr>
                <th>Pantone</th>
                <td>{product.pantone_value}</td>
              </tr>
            </tbody>
          </table>
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
