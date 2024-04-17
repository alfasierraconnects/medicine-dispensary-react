import React from "react";
import { useMedicineContext } from "../context/MedicineContext";
import CartItem from "./CartItem";

const CartList = () => {
  const { cart, getTotal } = useMedicineContext();

  return (
    <div className="container mx-auto p-4">
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="text-xl font-bold">Subtotal: ${getTotal().toFixed(2)}</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
        Buy
      </button>
    </div>
  );
};

export default CartList;
