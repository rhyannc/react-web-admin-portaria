import React from "react";
import api from "../services/api";
import "./../styles/Cart.css";

const Cart = ({ cart, setCart, handleRemoveFromCart }) => {
  const totalAmount = cart.reduce((acc, item) => acc + item.total, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calcula o total de itens


  const handleFinalizeSale = async () => {
    if (cart.length === 0) {
      alert("O carrinho está vazio. Adicione produtos antes de finalizar a venda.");
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        id_product: item.id_product,
        product: item.product,
        quantity: item.quantity,
        total: item.total,
      })),
      totalAmount: totalAmount,
      totalItems: totalItems, // Adiciona o total de itens no payload
    };

    try {
      const response = await api.post("/postorder", payload);
      if (response.status === 201) {
        alert("Venda finalizada com sucesso!");
        // Aqui você pode limpar o carrinho
        setCart([]);
      } else {
        alert("Erro ao finalizar venda. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      alert("Erro ao finalizar venda. Verifique a conexão e tente novamente.");
    }
  };

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
                <th></th>
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
            <p> <strong>R$ {totalAmount.toFixed(2)}</strong></p>
          </div>
          <button className="finalize-sale-btn" onClick={handleFinalizeSale}>
            Finalizar Venda
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
