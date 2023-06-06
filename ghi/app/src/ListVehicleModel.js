import React from "react";

export default function ModelList({ modelList, getModels }) {
  return (
    <div>
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {modelList.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img src={model.picture_url} width="250" height="250"></img>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
