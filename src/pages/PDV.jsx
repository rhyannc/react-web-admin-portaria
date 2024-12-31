import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import "./../styles/PDV.css";

const PDV = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/product")
      .then((response) => {
        setProducts(response.data.filter((p) => p.status === "ativo"));
      })
      .catch((err) => console.error(err));
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
        <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
      </div>
    </div>
  );
};

export default PDV;
