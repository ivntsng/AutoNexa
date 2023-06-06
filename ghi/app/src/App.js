import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import CreateManufacturer from "./CreateManufacturer";
import ListVehicleModel from "./ListVehicleModel";
import { useState, useEffect } from "react";

function App() {
  const [manufacturer, setManufacturer] = useState([]);

  async function getManufacturer() {
    const manufacturerUrl = "http://localhost:8100/api/inventory";
    const response = await fetch(manufacturerUrl);
    if (response.ok) {
      let data = await response.json();
      setManufacturer(data.manufacturer);
    }
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturerList">
            <Route
              index
              element={
                <ManufacturerList
                  manufacturerList={manufacturer}
                  getManufacturer={getManufacturer}
                />
              }
            />
          </Route>
          <Route path="createmanufactuer" element={<CreateManufacturer />} />
          <Route path="listvehiclemodel" element={<ListVehicleModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
