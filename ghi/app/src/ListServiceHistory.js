import React from "react";

export default function GetServiceHistory({ serviceList }) {
  return (
    <div>
      <h1>Service History</h1>

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
          {serviceList.map((service) => {
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
