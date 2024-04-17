import React from "react";
import CartList from "../components/CartList";

const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <CartList />
    </div>
  );
};

export default CartPage;
