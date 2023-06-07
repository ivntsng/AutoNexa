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
import ListAppointments from "./ListAppointments";
import ListTechnicians from "./ListTechnicians";
import CreateTechnicianForm from "./CreateTechnician";

function App() {
  const [manufacturer, setManufacturer] = useState([]);
  const [model, setModel] = useState([]);
  const [automobile, setAutomobile] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [technician, setTechnician] = useState([]);

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
      setAutomobile(data.autos);
    }
  }

  // async function getAppointment() {
  //   const appointmentUrl = "http://localhost:8080/api/appointments/";
  //   const response = await fetch(appointmentUrl);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setAppointment(data.appointments);
  //   }
  // }

  async function getTechnician() {
    const technicianUrl = "http://localhost:8080/api/technicians/";
    const response = await fetch(technicianUrl);
    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technicians);
    }
  }

  useEffect(() => {
    getManufacturer();
    getModels();
    getAutomobiles();
    getTechnician();
    // getAppointment();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
            <Route
              path="create"
              element={<CreateVehicleModel getModels={getModels} />}
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
            <Route
              path="create"
              element={<CreateAutomobile getAutomobiles={getAutomobiles} />}
            />
          </Route>
          <Route path="technicians">
            <Route
              index
              element={
                <ListTechnicians
                  techniciansList={technician}
                  getTechnician={getTechnician}
                />
              }
            />
            <Route
              path="create"
              element={<CreateTechnicianForm getTechnician={getTechnician} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
