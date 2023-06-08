import React, { useEffect, useState } from "react";

export default function CreateManufacturerForm({ getManufacturer }) {
  const [manufacturerName, setManufacturerName] = useState("");
  const [manufacturerNames, setManufacturerNames] = useState([]);

  const handleManufacturerChange = (e) => {
    const value = e.target.value;
    setManufacturerName(value);
  };

  useEffect(() => {
    async function listManufacturer() {
      const url = "http://localhost:8100/api/manufacturers";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setManufacturerNames(data.manufacturers);
      }
    }
    listManufacturer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = manufacturerName;

    const url = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "applications/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      setManufacturerName("");
      getManufacturer();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleManufacturerChange}
                value={manufacturerName}
                placeholder="manufacturer_name"
                required
                type="text"
                name="manufacturer_name"
                id="manufacturer_name"
                className="form-control"
              />
              <label htmlFor="manufacturer_name">Manufacturer name</label>
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
