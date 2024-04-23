import React from "react";
import { useMedicineContext } from "../context/MedicineContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const CartList = () => {
  const { cart, getTotal } = useMedicineContext();
  const navigate = useNavigate();
  const checkout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <ul>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
      <div className="flex justify-between items-center my-10">
        <p className="text-xl font-bold">
          Subtotal: &#8377;{getTotal().toFixed(2)}
        </p>
        <button
          onClick={checkout}
          className="bg-green-500 hover:bg-green-700 disabled:hidden text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline mt-4"
          disabled={getTotal() === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartList;
