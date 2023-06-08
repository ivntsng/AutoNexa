import React from "react";
import { useEffect, useState } from "react";
import "./index.css";

export default function AppointmentsList({
  appointmentsList,
  getAppointment,
  automobileList,
  getAutomobiles,
}) {
  const handleCancel = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
      method: "PUT",
      body: JSON.stringify({ status: "canceled" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json();
      if (response.ok) {
        getAppointment();
      }
    });
  };

  const handleFinish = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
      method: "PUT",
      body: JSON.stringify({ status: "finished" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json();
      if (response.ok) {
        getAppointment();
      }
    });
  };

  // useEffect(() => {
  //   getAutomobiles();
  // }, []);

  return (
    <div>
      <h1>Service Appointments</h1>
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
            // automobileList.filter(() => )
            if (appointment.status === "") {
              const curAutomobile = automobileList.filter(
                (a) => a.vin === appointment.vin
              )[0];
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{curAutomobile && curAutomobile.sold ? "Yes" : "No"}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.technician.first_name}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <button onClick={() => handleCancel(appointment.id)}>
                      Cancel
                    </button>
                    <button onClick={() => handleFinish(appointment.id)}>
                      Finish
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
