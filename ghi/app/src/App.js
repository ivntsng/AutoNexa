import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import CreateManufacturer from "./CreateManufacturer";
import ListVehicleModel from "./ListVehicleModel";
import { useState, useEffect } from "react";
import CreateVehicleModel from "./CreateVehicleModel";
import ListAutomobiles from "./ListAutomobiles";
import CreateAutomobile from "./CreateAutomobile";


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
          <Route path="createvehiclemodel" element={<CreateVehicleModel />} />
          <Route path="listautomobiles" element={<ListAutomobiles />} />
          <Route path="createautomobile" element={<CreateAutomobile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
