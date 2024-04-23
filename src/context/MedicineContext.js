import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

export const MedicineContext = createContext();

export const useMedicineContext = () => {
  return useContext(MedicineContext);
};

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);

  const addMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
  };

  const addToCart = (medicineId, quantity) => {
    console.log(medicineId, quantity);
    const existingIndex = cart.findIndex((item) => item.id === medicineId);
    const medicine = medicines.find((medicine) => medicine.id === medicineId);

    if (existingIndex === -1) {
      // If medicine is not already in the cart, add it
      if (quantity > medicine.quantity) {
        toast.error("Medicine out of stock for the quantity");
      } else {
        setCart([...cart, { id: medicineId, quantity }]);
        toast.success("Medicine addeed to cart");
      }
    } else {
      // If medicine is already in the cart, update its quantity
      const updatedCart = [...cart];
      if (updatedCart[existingIndex].quantity + quantity > medicine.quantity) {
        toast.error("Medicine out of stock for the quantity");
      } else {
        updatedCart[existingIndex].quantity += quantity;
        setCart(updatedCart);
        toast.success("Medicine addeed to cart");
      }
    }
  };

  const removeCartItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const medicine = medicines.find((medicine) => medicine.id === item.id);
      return total + medicine.price * item.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return cart.reduce((total, item) => total + Number(item.quantity), 0);
  };

  return (
    <MedicineContext.Provider
      value={{
        medicines,
        cart,
        addMedicine,
        addToCart,
        removeCartItem,
        getTotal,
        getCartItems,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
