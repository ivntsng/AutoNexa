import { useEffect, useState } from "react";

export default function CreateServiceAppointment({ getAppointment }) {
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [technician, setTechnician] = useState("");
  const [technicians, setTechnicians] = useState([]);

  const handleVinChange = (e) => {
    const value = e.target.value;
    setVin(value);
  };

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setCustomer(value);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason(value);
  };

  const handleTechnicianChange = (e) => {
    const value = e.target.value;
    setTechnician(value);
  };

  useEffect(() => {
    async function listTechnician() {
      const url = "http://localhost:8080/api/technicians/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    }
    listTechnician();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.vin = vin;
    data.customer = customer;
    data.date = date;
    data.time = time;
    data.reason = reason;
    data.technician_id = technician;

    const url = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newApt = await response.json();
      setVin("");
      setCustomer("");
      setDate("");
      setTime("");
      setReason("");
      setTechnician("");
      getAppointment();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-service-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleVinChange}
                value={vin}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCustomerChange}
                value={customer}
                placeholder="customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDateChange}
                value={date}
                placeholder="date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3 clickable-input">
              <input
                onChange={handleTimeChange}
                value={time}
                placeholder="time"
                required
                type="time"
                name="time"
                id="time"
                className="form-control"
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="form-floating mb-3 clickable-input">
              <input
                onChange={handleReasonChange}
                value={reason}
                placeholder="reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <select
              onChange={handleTechnicianChange}
              value={technician}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Choose a technician...</option>
              {technicians.map((technician) => {
                return (
                  <option key={technician.id} value={technician.id}>
                    {technician.first_name}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
