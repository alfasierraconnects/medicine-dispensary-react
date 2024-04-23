import React, { useState } from "react";
import { useMedicineContext } from "../context/MedicineContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotal, medicines, setCart, updateDocument } =
    useMedicineContext();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phoneNumber: "",
    doctorsName: "",
  });
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [isInvoiceGenerated, setIsInvoiceGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const generateInvoice = () => {
    if (
      customerDetails.name.trim() === "" ||
      customerDetails.phoneNumber.trim() === "" ||
      customerDetails.doctorsName.trim() === ""
    ) {
      toast.error("Invalid details");
    } else {
      const currentDate = new Date().toLocaleString();
      const newInvoiceId = `INV-${Math.floor(Math.random() * 100000)}`;
      setInvoiceId(newInvoiceId);
      setInvoiceDate(currentDate);
      setIsInvoiceGenerated(true);
    }
  };

  const printInvoice = () => {
    const updatedMedicinesCollection = [...medicines];
    cart.forEach((item) => {
      const updateMedicine = updatedMedicinesCollection.findIndex(
        (medicine) => medicine.id === item.id
      );
      updatedMedicinesCollection[updateMedicine].quantity -= item.quantity;

      // Remove the item from collection if quantity becomes zero
      if (updatedMedicinesCollection[updateMedicine].quantity <= 0) {
        updatedMedicinesCollection.splice(updateMedicine, 1);
      }
    });
    // setMedicines(updatedMedicinesCollection);
    const updatedData = {
      medicineCollection: JSON.stringify(updatedMedicinesCollection),
    };
    updateDocument(updatedData);
    setCart([]);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <ToastContainer />
      <h1 className="text-3xl text-center font-bold mb-4">Checkout</h1>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 rounded p-2 text-white fixed top-5 right-10"
      >
        Home
      </Link>

      {!isInvoiceGenerated ? (
        <div className="p-10 lg:px-20">
          <h3 className="text-xl font-bold mb-4">Customer Details</h3>
          <form className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Customer Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                name="phoneNumber"
                value={customerDetails.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Doctor's Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="doctorsName"
                value={customerDetails.doctorsName}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <button
            onClick={generateInvoice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Invoice
          </button>
        </div>
      ) : (
        <div className="px-10 lg:px-20">
          <h3 className="text-xl font-bold mb-4">Invoice Details</h3>
          <p>Invoice ID: {invoiceId}</p>
          <p>Date & Time: {invoiceDate}</p>
          <p>Customer Name: {customerDetails.name}</p>
          <p>Phone Number: {customerDetails.phoneNumber}</p>
          <p>Doctor's Name: {customerDetails.doctorsName}</p>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Medicine Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Quantity Purchased
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Cost of Each Medicine (&#8377;)
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Total (&#8377;)
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => {
                const medicine = medicines.find(
                  (medicine) => medicine.id === cartItem.id
                );
                const totalCost = medicine.price * cartItem.quantity;

                return (
                  <tr key={cartItem.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {medicine.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cartItem.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {medicine.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {totalCost.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>Subtotal: &#8377;{getTotal().toFixed(2)}</p>
          <button
            onClick={printInvoice}
            className="bg-green-500 hover:bg-green-700 disabled:hidden text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Print invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
