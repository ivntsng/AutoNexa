import { useEffect, useState } from "react";

export default function CreateSale({ getSales, getCustomer }) {
  const [automobile, setAutomobile] = useState("");
  const [automobiles, setAutomobiles] = useState([]);

  const [salesperson, setSalesperson] = useState("");
  const [salespersons, setSalespersons] = useState([]);

  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);

  const [price, setPrice] = useState("");

  const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  };

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
  };

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  useEffect(() => {
    async function ListAutomobiles() {
      const url = "http://localhost:8100/api/automobiles/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const availableAutomobiles = data.autos.filter((auto) => !auto.sold);
        setAutomobiles(availableAutomobiles);
      }
    }
    async function ListSalespeople() {
      const url = "http://localhost:8090/api/salespeople/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespersons(data.salespeople);
      }
    }

    async function ListCustomers() {
      const url = "http://localhost:8090/api/customers/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await fetch(url);
        setCustomers(data.customers);
      }
    }

    ListAutomobiles();
    ListSalespeople();
    ListCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;

    const url = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      setAutomobile("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
    }
  };

  return (
    <div className="justify-content-center align-items-center">
      <div className="shadow p-4 mt-4">
        <h1>Create Sale</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Automobile VIN</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={handleAutomobileChange}
              value={automobile}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Choose an automobile VIN...</option>
              {automobiles.map((automobile) => {
                return (
                  <option key={automobile.id} value={automobile.vin}>
                    {automobile.vin}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Salesperson</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={handleSalespersonChange}
              value={salesperson}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Choose a salesperson...</option>
              {salespersons.map((salesperson) => {
                return (
                  <option key={salesperson.id} value={salesperson.employee_id}>
                    {salesperson.first_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Customer</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={handleCustomerChange}
              value={customer}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Choose a customer...</option>
              {customers.map((customer) => {
                return (
                  <option key={customer.id} value={customer.id}>
                    {customer.first_name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
