import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MedicineProvider } from "./context/MedicineContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <MedicineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <p className="flex justify-center text-xl py-20">
                page not found
              </p>
            }
          />
        </Routes>
      </Router>
    </MedicineProvider>
  );
}

export default App;
