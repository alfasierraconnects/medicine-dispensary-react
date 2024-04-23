import React from "react";
import { useNavigate } from "react-router-dom";
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";
import { useMedicineContext } from "../context/MedicineContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { getCartItems } = useMedicineContext();

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <ToastContainer />
      <h1 className="text-3xl text-center font-bold mb-4">
        Medicine Dispensary
      </h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 rounded p-2 text-white fixed top-5 right-10"
        onClick={goToCart}
      >
        <ion-icon size="large" name="cart-outline"></ion-icon>
        {getCartItems() > 0 && (
          <p className="bg-red-500 flex items-center justify-center fixed top-3 right-6 w-8 h-8 rounded-full text-white">
            {getCartItems()}
          </p>
        )}
      </button>

      <MedicineForm />
      <h2 className="text-2xl text-center font-bold mb-4">
        Medicines in Stock
      </h2>
      <MedicineList />
    </div>
  );
};

export default HomePage;
