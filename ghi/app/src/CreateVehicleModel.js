import { useState, useEffect} from 'react';
import React from "react";

function CreateVehicleModel() {
  return <p>Creating a new vehicle model</p>;
function CreateVehicleModel(){
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [manufacturer, setManufacturer] = useState('')
    const [manufacturers, setManufacturers] = useState([]);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }

    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        const json = JSON.stringify(data)
        const url = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(url, fetchConfig)
        if(response.ok){
            const newVehicle = await response.json()
            setName('')
            setPicture('')
            setManufacturer('')
        }
    }
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);

        if(response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers)

        }else{
            console.error(response)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <form onSubmit={handleSubmit}>
            <h1>Create a vehicle model</h1>
            <div className="form-floating mb-3">
                <input onChange={handleNameChange} type="text" value={name} className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label>Model name...</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePictureChange} type="text" value={picture} className="form-control" id="floatingPassword" placeholder="Password"/>
                <label>Picture URL...</label>
            </div>
            <select onChange={handleManufacturerChange} value={manufacturer} className="form-select" aria-label="Default select example">
                <option>Choose a manufacturer...</option>
                    {manufacturers.map((manufacturer) => {
                        return(
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        )
                    })}
            </select>
            <button className="btn btn-primary">Create</button>
        </form>
    )
function CreateVehicleModel() {
  return <p>Creating a new vehicle model</p>;
}

export default CreateVehicleModel;
