import React, { useState } from "react";
import { useMedicineContext } from "../context/MedicineContext";

const MedicineForm = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { addMedicine } = useMedicineContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && description.trim() !== "") {
      const newMedicine = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      };
      addMedicine(newMedicine);
      setName("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
    }
  };

  return (
    <div className="container flex flex-col mx-auto lg:px-20 p-8">
      {!formOpen && (
        <button
          onClick={() => setFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Medicines to Dispensary
        </button>
      )}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className=" bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-3 gap-y-2 mb-6">
            <label
              className="col-span-1 block text-gray-900 font-bold mb-2"
              htmlFor="name"
            >
              Medicine Name
            </label>
            <input
              className="focus:ring-2 ring-blue-500 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none"
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label
              className="col-span-1 block text-gray-900 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="focus:ring-2 ring-blue-500 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label
              className="col-span-1 block text-gray-900 font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="focus:ring-2 ring-blue-500 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              min={0}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />

            <label
              className="col-span-1 block text-gray-900 font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="focus:ring-2 ring-blue-500 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={quantity}
              min={0}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-around">
            <button
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Medicine
            </button>
            <button
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setFormOpen(false)}
            >
              Close Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MedicineForm;
