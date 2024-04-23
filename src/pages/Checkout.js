import React, { useState } from "react";
import { useMedicineContext } from "../context/MedicineContext";
import CartItem from "../components/CartItem";

const Checkout = () => {
  const { cart, getTotal } = useMedicineContext();
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
    const currentDate = new Date().toLocaleString();
    const newInvoiceId = `INV-${Math.floor(Math.random() * 100000)}`;
    setInvoiceId(newInvoiceId);
    setInvoiceDate(currentDate);
    setIsInvoiceGenerated(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <button className="bg-blue-500 hover:bg-blue-700 rounded p-2 text-white fixed top-5 right-10">
        Home
      </button>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="my-6">
        <p className="text-xl font-bold">
          Subtotal: &#8377;{getTotal().toFixed(2)}
        </p>
      </div>
      {!isInvoiceGenerated ? (
        <div>
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
        <div>
          <h3 className="text-xl font-bold mb-4">Invoice Details</h3>
          <p>Invoice ID: {invoiceId}</p>
          <p>Date & Time: {invoiceDate}</p>
          <p>Customer Name: {customerDetails.name}</p>
          <p>Phone Number: {customerDetails.phoneNumber}</p>
          <p>Doctor's Name: {customerDetails.doctorsName}</p>
          <p>Subtotal: &#8377;{getTotal().toFixed(2)}</p>
          {/* You can add more details like taxes, total amount, etc. */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
