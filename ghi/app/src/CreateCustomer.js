import {useEffect, useState} from 'react';


export default function CreateNewCustomer({ getCustomer }) {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [customers, setCustomers] = useState([]);


  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  useEffect(() => {
    async function ListCustomers() {
      const url = "http://localhost:8090/api/customers/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
      }
    }
    ListCustomers();
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {};
    data.first_name = first_name;
    data.last_name = last_name;
    data.address = address;
    data.phone_number = phone_number;

    const url = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      setFirstName("");
      setLastName("");
      setAddress("")
      setPhoneNumber("");
    }
  };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={first_name}
                placeholder="First name..."
                required
                type="text"
                name="first_name"
                id="first_name"
              />

            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={last_name}
                placeholder="Last name..."
                required
                type="text"
                name="last_name"
                id="last_name"
              />

            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneNumberChange}
                value={phone_number}
                placeholder="Phone number..."
                required
                type="text"
                name="phone_number"
                id="phone_number"
              />

            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                value={address}
                placeholder="Address..."
                required
                type="text"
                name="phone_number"
                id="phone_number"
              />

            </div>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
