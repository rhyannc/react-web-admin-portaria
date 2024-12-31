import React from "react";
import "./../styles/Cart.css";

const Cart = ({ cart, handleRemoveFromCart }) => {
  const totalAmount = cart.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="cart-container">
      <h2>Itens</h2>
      {cart.length === 0 ? (
        <p>Carrinho vazio.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id_product}>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {item.total.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveFromCart(item.id_product)}
                      className="cart-remove-btn"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totais">
            <p> <strong>Total: R$ {totalAmount.toFixed(2)}</strong></p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
