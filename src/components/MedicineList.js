import React from "react";
import { useMedicineContext } from "../context/MedicineContext";

const MedicineList = () => {
  const { medicines, addToCart } = useMedicineContext();

  return (
    <div className="container mx-auto p-4">
      <ul>
        {medicines.map((medicine) => (
          <li
            key={medicine.id}
            className="bg-white shadow-md rounded px-8 py-4 mb-4"
          >
            <h3 className="text-xl font-bold">{medicine.name}</h3>
            <p className="text-gray-700">{medicine.description}</p>
            <p className="text-gray-700">Price: ${medicine.price.toFixed(2)}</p>
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
                type="number"
                placeholder="Quantity"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => addToCart(medicine)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
