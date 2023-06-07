import React, { useEffect, useState } from "react";

export default function CreateAutomobileForm({ getAutomobiles }) {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
  };

  const handleVinChange = (e) => {
    const value = e.target.value;
    setVin(value);
  };

  const handleModelChange = (e) => {
    const value = e.target.value;
    setModel(value);
  };

  useEffect(() => {
    async function listAutomobile() {
      const url = "http://localhost:8100/api/models/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      }
    }
    listAutomobile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;

    const url = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      setColor("");
      setModel("");
      setVin("");
      setYear("");
      getAutomobiles();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleColorChange}
                value={color}
                placeholder="color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleYearChange}
                value={year}
                placeholder="year"
                required
                type="text"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleVinChange}
                value={vin}
                placeholder="vin"
                required
                type="text"
                name="year"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN...</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleModelChange}
                value={model}
                required
                id="model"
                type="text"
                name="model"
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models &&
                  models.map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    );
                  })}
              </select>
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
