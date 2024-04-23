import React from "react";
import { useMedicineContext } from "../context/MedicineContext";

const CartItem = ({ item }) => {
  const { medicines } = useMedicineContext();
  const { removeCartItem } = useMedicineContext();
  const medicine = medicines.find((medicine) => medicine.id === item.id);

  return (
    <li className="bg-blue-100 shadow-md rounded px-8 py-4 my-2 grid grid-cols-4 gap-x-2 items-center">
      <h3 className="text-xl font-bold col-span-1">{medicine.name}</h3>
      <p className="text-gray-900 text-center font-semibold col-span-1">
        Quantity: {item.quantity}
      </p>
      <p className="text-gray-900 font-semibold col-span-1">
        Total: &#8377;{(medicine.price * item.quantity).toFixed(2)}
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
