import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import CreateManufacturer from "./CreateManufacturer";
import ListVehicleModel from "./ListVehicleModel";
import { useState, useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturerList" element={<ManufacturerList />} />
          <Route path="createmanufactuer" element={<CreateManufacturer />} />
          <Route path="listvehiclemodel" element={<ListVehicleModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
