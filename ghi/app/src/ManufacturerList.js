import React from "react";

export default function ManufacturerList({ manufacturerList, getManufacturer }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {manufacturerList.map((manufacturer) => {
          return (
            <tr key={manufacturer.id}>
              <td>{manufacturer.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
