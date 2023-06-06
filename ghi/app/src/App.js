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
  const [manufacturer, setManufacturer] = useState([]);
  const [model, setModel] = useState([]);
  const [automobile, setAutomobile] = useState([]);


  async function getManufacturer() {
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturerUrl);
    if (response.ok) {
      const data = await response.json();
      setManufacturer(data.manufacturers);
    }
  }

  async function getModels() {
    const vehicleModelUrl = "http://localhost:8100/api/models/";
    const response = await fetch(vehicleModelUrl);
    if (response.ok) {
      const data = await response.json();
      setModel(data.models);
    }
  }

  async function getAutomobiles() {
    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const response = await fetch(automobileUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAutomobile(data.autos);
    }
  }

  useEffect(() => {
    getManufacturer();
    getModels();
    getAutomobiles();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturerList" element={<ManufacturerList />} />
          <Route path="listvehiclemodel" element={<ListVehicleModel />} />
          <Route path="createvehiclemodel" element={<CreateVehicleModel />} />
          <Route path="createautomobile" element={<CreateAutomobile />} />
          <Route path="manufacturers">
            <Route
              index
              element={
                <ManufacturerList
                  manufacturerList={manufacturer}
                  getManufacturer={getManufacturer}
                />
              }
            />
            <Route
              path="new"
              element={<CreateManufacturer getManufacturer={getManufacturer} />}
            />
          </Route>
          <Route path="models">
            <Route
              index
              element={
                <ListVehicleModel modelList={model} getModels={getModels} />
              }
            />
          </Route>
          <Route path="automobiles">
            <Route
              index
              element={
                <ListAutomobiles
                  automobileList={automobile}
                  getAutomobiles={getAutomobiles}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
//
