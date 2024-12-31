import React, { useState, useEffect } from "react";
import api from "../services/api";

import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import "./../styles/PDV.css";

const PDV = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/listarproduct");
        setProducts(response.data.filter((p) => p.status === "Ativo"));
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };
  
    fetchProducts();
  }, []);






  const handleAddToCart = (product) => {
    const qty = parseInt(quantity[product.id_product] || 0);
    if (qty > 0) {
      const item = { ...product, quantity: qty, total: qty * parseFloat(product.value) };
      setCart([...cart, item]);
      setQuantity({ ...quantity, [product.id_product]: 0 });
    }
  };

  const handleRemoveFromCart = (id_product) => {
    setCart(cart.filter((item) => item.id_product !== id_product));
  };

  return (
    <div className="pdv-layout">
      <div className="pdv-column">
        <ProductList
          products={products}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
        />
      </div>
      <div className="pdv-column">
        <Cart cart={cart} setCart={setCart} handleRemoveFromCart={handleRemoveFromCart} />
      </div>
    </div>
  );
};

export default PDV;
