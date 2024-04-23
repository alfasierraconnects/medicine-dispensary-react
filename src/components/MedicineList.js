import React from "react";
import { useMedicineContext } from "../context/MedicineContext";
import MedicineItem from "./MedicineItem";

const MedicineList = () => {
  const { medicines } = useMedicineContext();

  return (
    <div className="container mx-auto p-8 lg:px-20">
      <ul>
        {medicines.map((medicine) => (
          <MedicineItem key={medicine.id} medicine={medicine} />
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
