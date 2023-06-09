import React, { useState } from "react";

export default function GetServiceHistory({
  serviceList,
  automobileList,
  getAutomobiles,
}) {
  const [vin, setVin] = useState("");

  const handleSearchInputChange = (event) => {
    setVin(event.target.value);
  };

  const DateTimeFormat = (dateTimeString) => {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const dateTimeUTC = new Date(dateTimeString + "Z");
    const adjustedDateTime = new Date(
      dateTimeUTC.getTime() + 5 * 60 * 60 * 1000
    );
    const dateTimeFormatted = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return dateTimeFormatted;
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
            <th>Date & Time</th>
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
                const curAutomobile = automobileList.filter(
                  (a) => a.vin === service.vin
                )[0];
                const dateTimeFormatted = DateTimeFormat(service.date_time);
                return (
                  <tr key={service.id}>
                    <td>{service.vin}</td>
                    <td>
                      {curAutomobile && curAutomobile.sold ? "Yes" : "No"}
                    </td>
                    <td>{service.customer}</td>
                    <td>{dateTimeFormatted}</td>
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
