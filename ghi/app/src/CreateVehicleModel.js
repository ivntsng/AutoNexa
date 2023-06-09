import { useEffect, useState } from 'react';

export default function CreateNewModel({getModels}){
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [manufacturers, setManufacturers] = useState([])

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value)
  }

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value)
  }

  const handleManufacturerChange = (event) => {
    const value = event.target.value
    setManufacturer(value)
  }

  useEffect(() => {
    async function CreateModel(){
      const url = "http://localhost:8100/api/manufacturers/"
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setManufacturers(data.manufacturers)
      }
    }
    CreateModel();
  }, [])

  const handleSubmit = async(event) => {
    event.preventDefault()
    const data = {}
    data.name = name
    data.picture_url = picture
    data.manufacturer_id = manufacturer

    const url = "http://localhost:8100/api/models/"
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }

    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const newModel = await response.json()
      setName("")
      setPicture("")
      setManufacturer("")
      getModels()
    }
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Model</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="First name..."
                required
                type="text"
                name="name"
                id="name"
              />

            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={picture}
                placeholder="Picture url..."
                required
                type="text"
                name="picture"
                id="picture"
              />

            </div>
            <div className="form-floating mb-3">
            <select
        onChange={handleManufacturerChange}
        value={manufacturer}
        className="form-select"
        aria-label="Default select example"
      >
        <option>Choose a manufacturer...</option>
        {manufacturers.map((manufacturer) => {
          return (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          );
        })}
      </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
