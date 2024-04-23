import React from "react";
import CartList from "../components/CartList";

const CartPage = () => {
  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-3xl text-center font-bold mb-4">Cart</h1>
      <CartList />
    </div>
  );
};

export default CartPage;
