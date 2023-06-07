import React, { useEffect, useState } from "react";

export default function CreateTechnicianForm({ getTechnicians }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [employee_ids, setEmployee_ids] = useState([]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleEmployeeChange = (e) => {
    const value = e.target.value;
    setEmployee_id(value);
  };

  useEffect(() => {
    async function ListTechnician() {
      const url = "http://localhost:8080/api/technicians/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEmployee_ids(data.technicians);
      }
    }
    ListTechnician();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.employee_id = employee_id;

    const url = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newTech = await response.json();
      setFirstName("");
      setLastName("");
      setEmployee_id("");
      getTechnicians();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={firstName}
                placeholder="first_name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={lastName}
                placeholder="lastName"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
              />
              <label htmlFor="lastName">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEmployeeChange}
                value={employee_id}
                placeholder="Employee_ID"
                required
                type="text"
                name="Employee_ID"
                id="Employee_ID"
                className="form-control"
              />
              <label htmlFor="Employee_ID">Employee ID...</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
