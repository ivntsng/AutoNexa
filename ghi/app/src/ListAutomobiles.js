import React, { useState, useEffect } from 'react';

function AutomobileList({automobilesList, getAutomobiles}){
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobilesList.map(automobile => {
                    return (
                        <tr key={automobile.vin}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model}</td>
                            <td>{automobile.manufacturer}</td>
                            <td>{automobile.sold}</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default AutomobileList;
