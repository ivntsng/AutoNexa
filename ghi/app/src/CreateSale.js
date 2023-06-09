import {useEffect, useState} from 'react';

export default function CreateSale({getSale}) {
  const [automobile, setAutomobile] = useState('');
  const [automobiles, setAutomobiles] = useState([]);

  const [salesperson, setSalesperson] = useState('');
  const [salespersons, setSalespersons] = useState([]);

  const [customer, setCustomer] = useState('');
  const [customers, setCustomers] = useState('');

  const [price, setPrice] = useState('');

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
  }

  useEffect( () => {
    async function ListAutomobiles() {
      const url = "http://localhost:8100/api/automobiles/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const availableAutomobiles = data.autos.filter(auto => !auto.sold);
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
        setCustomers(data.customers)
      }
    }

    ListAutomobiles();
    ListSalespeople();
    ListCustomers();
  }, []);

  const handleSubmit = async(event) => {
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
    <p>I CANT DO THIS JSX!!!!</p>
  )
}
