import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToCart = () => {
    navigate("/cart"); // Navigate to /cart
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Medicine Dispensary</h1>
      <MedicineForm />
      <h2 className="text-2xl font-bold mb-4">Medicines in Stock</h2>
      <MedicineList />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        onClick={goToCart} // Call goToCart function on button click
      >
        Go to Cart
      </button>
    </div>
  );
};

export default HomePage;
