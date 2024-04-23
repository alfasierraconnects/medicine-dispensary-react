import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const MedicineContext = createContext();

export const useMedicineContext = () => {
  return useContext(MedicineContext);
};

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cloud.appwrite.io/v1/databases/6627ac42efa9611b216a/collections/6627ac854c14f7cbc29b/documents/6627aecf8a83d5afdc07",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": "662270dcb941c8066073",
            },
          }
        );
        const data = await response.json();
        // const dataToset = JSON.parse(data.medicineCollection);
        setMedicines(JSON.parse(data.medicineCollection));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //update data in database
  const updateDocument = async (dataToUpdate) => {
    try {
      const response = await fetch(
        "https://cloud.appwrite.io/v1/databases/6627ac42efa9611b216a/collections/6627ac854c14f7cbc29b/documents/6627aecf8a83d5afdc07",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Appwrite-Project": "662270dcb941c8066073",
          },
          body: JSON.stringify({
            data: dataToUpdate,
            permissions: ['read("any")'],
          }),
        }
      );

      const data = await response.json();
      setMedicines(JSON.parse(data.medicineCollection));
    } catch (error) {
      console.error(error);
    }
  };

  //add medicine when new medicine data entered
  const addMedicine = (medicine) => {
    const updatedData = {
      medicineCollection: JSON.stringify([...medicines, medicine]),
    };
    updateDocument(updatedData);
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
        setMedicines,
        setCart,
        addMedicine,
        addToCart,
        removeCartItem,
        getTotal,
        getCartItems,
        updateDocument,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
