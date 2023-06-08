import React, { useState } from "react";

export default function GetServiceHistory({ serviceList }) {
  const [vin, setVin] = useState("");

  const handleSearchInputChange = (event) => {
    setVin(event.target.value);
  };

  return (
    <div>
      <h1>Service History</h1>

      <div>
        <input
          placeholder="Search by VIN"
          value={vin}
          onChange={handleSearchInputChange}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceList
            .filter((service) => {
              if (vin === "") {
                return true;
              } else if (
                service.vin.toLowerCase().includes(vin.toLowerCase())
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((service, index) => {
              if (
                service.status === "finished" ||
                service.status === "canceled"
              ) {
                return (
                  <tr key={service.id}>
                    <td>{service.vin}</td>
                    <td>{service.vip ? "Yes" : "No"}</td>
                    <td>{service.customer}</td>
                    <td>{service.date}</td>
                    <td>{service.time}</td>
                    <td>{service.technician.first_name}</td>
                    <td>{service.reason}</td>
                    <td>{service.status}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
        </tbody>
      </table>
    </div>
  );
}
