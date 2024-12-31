import React from "react";
import "./../styles/ProductList.css";

const ProductList = ({ products, quantity, setQuantity, handleAddToCart }) => {
  return (
    <div className="product-list-container">
      <h2>Produtos Disponíveis</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_product}>
              <td>{product.product}</td>
              <td>R$ {parseFloat(product.value).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  placeholder="Qtd"
                  value={quantity[product.id_product] || ""}
                  onChange={(e) =>
                    setQuantity({ ...quantity, [product.id_product]: e.target.value })
                  }
                  className="product-quantity-input"
                />
              </td>
              <td>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="product-add-btn"
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
