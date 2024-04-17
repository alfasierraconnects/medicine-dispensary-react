import React, { createContext, useState, useContext } from "react";

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

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const removeCartItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
