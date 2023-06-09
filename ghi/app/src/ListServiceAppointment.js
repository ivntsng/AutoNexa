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
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const timeString = `${month}/${day}/${year}, ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
    return timeString;
  };

  return (
    <div>
      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map((appointment) => {
            if (appointment.status === "") {
              const curAutomobile = automobileList.filter(
                (a) => a.vin === appointment.vin
              )[0];
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{curAutomobile && curAutomobile.sold ? "Yes" : "No"}</td>
                  <td>{appointment.customer}</td>
                  <td>{formatDate(appointment.date_time)}</td>
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
