import {useEffect, useState} from 'react';

export default function SalesHistory({ getSales }) {
  const [salesperson, setSalesperson] = useState("");
  const [salespersons, setSalespersons] = useState([]);
  const [sales, setSales] = useState([]);

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
  };

  useEffect(() => {
    async function ListSalespeople(){
      const url = "http://localhost:8090/api/salespeople/"
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setSalesperson(data.salespeople)
      }
    }
    async function ListSales(){
      const url = "http://localhost:8090/api/sales/"
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setSales(data.sales)
      }
    }

    ListSalespeople();
    ListSales();
  }, []);

  return (
    <p>TEST</p>
  )
}
