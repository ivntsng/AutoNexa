import React from "react";

export default function AppointmentsList({ appointmentsList }) {
  return (
    <div>
      <h1>Technicians</h1>
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
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.vip ? "Yes" : "No"}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.technician.first_name}</td>
                <td>{appointment.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
