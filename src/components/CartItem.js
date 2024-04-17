import React from "react";
import { useMedicineContext } from "../context/MedicineContext";

const CartItem = ({ item }) => {
  const { removeCartItem } = useMedicineContext();

  return (
    <li className="bg-white shadow-md rounded px-8 py-4 mb-4">
      <h3 className="text-xl font-bold">{item.name}</h3>
      <p className="text-gray-700">Quantity: {item.quantity}</p>
      <p className="text-gray-700">
        Total: ${(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => removeCartItem(item.id)}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
