import {useEffect, useState} from 'react';

export default function CreateSalesperson({getSalesperson}){
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [employee_id, setEmployeeId] = useState('');
  const [salespeople, setSalespeople] = useState([]);

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleEmployeeIdChange = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  useEffect(() => {
    async function ListSalespeople() {
      const url = "http://localhost:8090/api/salespeople/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
      }
    }
    ListSalespeople();
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {};
    data.employee_id = employee_id;
    data.first_name = first_name;
    data.last_name = last_name;

    const url = "http://localhost:8090/api/salespeople/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSalesperson = await response.json();
      setEmployeeId("");
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
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
                onChange={handleEmployeeIdChange}
                value={employee_id}
                placeholder="Employee ID..."
                required
                type="text"
                name="employee_id"
                id="employee_id"
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
