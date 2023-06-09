import { useEffect, useState } from 'react';

export default function SalesHistory({ getSales, getSalesPeople }) {
  const [salesperson, setSalesperson] = useState('');
  const [salespersons, setSalespersons] = useState([]);
  const [sales, setSales] = useState([]);

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
  };

  useEffect(() => {
    async function listSalespeople() {
      const url = 'http://localhost:8090/api/salespeople/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespersons(data.salespeople);
      }
    }

    async function listSales() {
      const url = 'http://localhost:8090/api/sales/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
        
      }
    }

    listSalespeople();
    listSales();
  }, []);

  return (
    <div className="justify-content-center align-items-center">
      <div className="shadow p-4 mt-4">
        <h1>Salesperson History</h1>
      </div>
      <div className="form-floating mb-3">
        <select
          onChange={handleSalespersonChange}
          value={salesperson}
          className="form-select"
          aria-label="Default select example"
        >
          <option>Choose a salesperson...</option>
          {salespersons.map((sp) => (
            <option key={sp.id} value={sp.employee_id}>
              {sp.first_name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>Automobile VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .filter((sale) => sale.salesperson.id === parseInt(salesperson, 10))
            .map((record) => (
              <tr key={record.id}>
                <td>{record.salesperson.first_name}</td>
                <td>{record.customer.first_name}</td>
                <td>{record.automobile.vin}</td>
                <td>{record.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
