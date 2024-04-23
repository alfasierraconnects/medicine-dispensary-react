import React from "react";
import CartList from "../components/CartList";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-3xl text-center font-bold mb-4">Cart</h1>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 rounded p-2 text-white fixed top-5 right-10"
      >
        Home
      </Link>
      <CartList />
    </div>
  );
};

export default CartPage;
