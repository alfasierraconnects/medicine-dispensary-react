import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MedicineProvider } from "./context/MedicineContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <MedicineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </MedicineProvider>
  );
}

export default App;
