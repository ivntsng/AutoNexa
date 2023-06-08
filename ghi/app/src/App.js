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
import ListSale from "./ListSale";
import ListSalesperson from "./ListSalesperson";
import CreateSalesperson from "./CreateSalesperson";
import CreateServiceAppointment from "./CreateServiceAppointment";
import ListServiceAppointment from "./ListServiceAppointment";
import ListServiceHistory from "./ListServiceHistory";
import ListSalesHistory from "./ListSalesHistory";
import CreateSale from "./CreateSale";
import CreateCustomer from "./CreateCustomer";
import ListCustomers from "./ListCustomers";

function App() {
  const [manufacturer, setManufacturer] = useState([]);
  const [model, setModel] = useState([]);
  const [automobile, setAutomobile] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [technician, setTechnician] = useState([]);
  const [salesPeople, setSalesPeople] = useState([]);
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState([]);

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
      console.log(data);
    }
  }

  async function getAppointment() {
    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const response = await fetch(appointmentUrl);
    if (response.ok) {
      const data = await response.json();
      setAppointment(data.appointments);
    }
  }

  async function getTechnicians() {
    const technicianUrl = "http://localhost:8080/api/technicians/";
    const response = await fetch(technicianUrl);
    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technicians);
    }
  }

  async function getSalesPeople() {
    const salesUrl = "http://localhost:8090/api/salespeople/";
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesPeople(data.salespeople);
    }
  }

  async function getSales() {
    const saleUrl = "http://localhost:8090/api/sales/";
    const response = await fetch(saleUrl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  }

  async function getCustomer() {
    const customerUrl = "http://localhost:8090/api/customers/";
    const response = await fetch(customerUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomer(data.customers);
    }
  }

  useEffect(() => {
    getManufacturer();
    getModels();
    getAutomobiles();
    getTechnicians();
    getSalesPeople();
    getAppointment();
    getCustomer();
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
                  getTechnicians={getTechnicians}
                />
              }
            />
            <Route
              path="create"
              element={<CreateTechnicianForm getTechnicians={getTechnicians} />}
            />
          </Route>
          <Route path="salespeople">
            <Route
              index
              element={
                <ListSalesperson
                  salesPersonList={salesPeople}
                  getSalesPeople={getSalesPeople}
                />
              }
            />
            <Route
              path="create"
              element={<CreateSalesperson getSalesPeople={getSalesPeople} />}
            />
          </Route>
          <Route path="customers">
            <Route
              index
              element={
                <ListCustomers
                  customerList={customer}
                  getCustomer={getCustomer}
                />
              }
            />
            <Route
              path="create"
              element={<CreateCustomer getCustomer={getCustomer} />}
            />
          </Route>
          <Route path="sales">
            <Route
              index
              element={<ListSale salesList={sales} getSales={getSales} />}
            />
            <Route path="create" element={<CreateSale getSales={getSales} />} />
            <Route
              path="history"
              element={<ListSalesHistory getSales={getSales} />}
            />
          </Route>
          <Route path="appointments">
            <Route
              index
              element={
                <ListServiceAppointment
                  appointmentsList={appointment}
                  getAppointment={getAppointment}
                />
              }
            />
            <Route
              path="create"
              element={
                <CreateServiceAppointment getAppointment={getAppointment} />
              }
            />
            <Route
              path="history"
              element={
                <ListServiceHistory
                  serviceList={appointment}
                  getAppointment={getAppointment}
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
