import React, { useState } from "react";
import { useMedicineContext } from "../context/MedicineContext";

const MedicineItem = ({ medicine }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useMedicineContext();

  return (
    <li
      key={medicine.id}
      className="bg-blue-100 shadow-md rounded px-8 py-4 my-2 grid grid-cols-5 gap-x-2 items-center "
    >
      <h3 className="text-xl font-bold col-span-1">{medicine.name}</h3>
      <p className="text-gray-900 text-center font-semibold col-span-1">
        {medicine.description}
      </p>
      <p className="text-gray-900 font-semibold col-span-1">
        Price: &#8377; {medicine.price.toFixed(2)}
      </p>

      <input
        className="col-span-1 focus:ring-2 ring-blue-500 shadow border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none"
        name="quantity"
        type="number"
        min="0"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        className="col-span-1 bg-blue-500 hover:bg-blue-700 disabled:hidden text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          if (quantity > 0) {
            addToCart(medicine.id, Number(quantity));
            setQuantity(0);
          }
        }}
        disabled={Number(quantity) === 0}
      >
        Add to Cart
      </button>
    </li>
  );
};

export default MedicineItem;
