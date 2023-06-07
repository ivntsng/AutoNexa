import React from "react";

export default function TechnicianList({ techniciansList, getTechnician }) {
  return (
    <div>
      <h1>Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {techniciansList.map((technician) => {
            return (
              <tr key={technician.id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
