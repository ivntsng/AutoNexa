import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import { useState, useEffect } from "react";

function App() {
  const [service, setService] = useState([]);
  const [sales, setSales] = useState([]);

  async function loadService() {
    const serviceUrl = "http://localhost:8080/api/service/";
    const response = await fetch(serviceUrl);
    if (response.ok) {
      const data = await response.json();
      setService(data.service);
    }
  }

  async function loadSales() {
    const salesUrl = "http://localhost:8090/api/sales/";
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  }

  useEffect(() => {
    loadService();
    loadSales();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/service">
            <Route
              index
              element={
                <ManufacturerList
                  manufacturersList={service}
                  getManufacturer={loadService}
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
