# CarCar

Team:

- Ivan Tsang - Auto Service
- Person 2 - Which microservice?

## Getting Started

1. Create a fork of this repository.
2. Copy the forked repository to your local computer by using the following command: git clone <<repository.url.here>>

3. Utilize Docker to build and execute the project by executing the following commands:

```
Create a Docker volume named "beta-data" using:
docker volume create beta-data
Build the Docker services using: docker-compose build
Start the Docker services using: docker-compose up
```

4. Verify that all Docker containers are running once the above commands have been executed.

5. Open your preferred web browser and navigate to the following URL: http://localhost:3000/ to view the project.

## Design

## Service microservice

Introducing the service microservice!

###Service Appointments:

| Description                          | Method | URL                                                           |
| ------------------------------------ | ------ | ------------------------------------------------------------- |
| List service appointments            | GET    | http://localhost:8080/api/serviceappointment/                 |
| Create service appointment           | POST   | http://localhost:8080/api/serviceappointment/                 |
| Delete service appointment           | DELETE | http://localhost:8080/api/serviceappointment/<int:id>         |
| Set appointment status to 'canceled' | PUT    | http://localhost:8080/api/serviceappointment/<int:id>/cancel/ |
| Set appointment status to 'finished' | PUT    | http://localhost:8080/api/serviceappointment/<int:id>/finish/ |

##### Create Service Appointments:

This feature allows you to create a service appointment. The information will be returned in the following format:

```
{
  "vin": "WBS3R9C54GK708127",
  "customer": "Casper",
  "date_time": "2024-03-14T03:17",
  "reason": "Crank Hub",
  "technician": FooBar
}
```

##### List Service Appointment Detail:

This feature allows you to obtain a comprehensive list of all existing service appointments. The information will be presented in the following format:

```
{
	"appointments": [
		{
			"vin": "WBS3R9C54GK708127",
			"customer": "Casper",
			"date_time": "2023-06-08T19:22:00+00:00",
			"reason": "Crank Hub",
			"status": "finished",
			"vip": false,
			"canceled": false,
			"finished": false,
			"technician": {
				"first_name": "Daniel",
				"last_name": "Miller",
				"employee_id": "tech-22",
				"id": 21
			},
			"id": 2
		}
  ]
```

##### Delete an appointment:

To delete an appointment you'd have to use `Delete service appointment` - `http://localhost:8080/api/serviceappointment/<int:id>` URL at the top.

Example:

```
{
	"deleted": true
}
```

##### Updating the appointment status to "Canceled" or "Finished"

To update to either status you'd have to use `Set appointment status to 'canceled'` or `Set appointment status to 'finished'`

Example:

```
{
	"status": "finished"
}
```

OR

```
{
	"status": "canceled"
}
```

### Technicians

Introducing the technicians!

| Description                  | Method | URL                                       |
| ---------------------------- | ------ | ----------------------------------------- |
| List technicians             | GET    | http://localhost:8080/api/technicians/    |
| Create a technician          | POST   | http://localhost:8080/api/technicians/    |
| Delete a specific technician | DELETE | http://localhost:8080/api/technicians/:id |

##### Creating a technician:
To create a technician you'd need to use a `POST` request to `http://localhost:8080/api/technicians/` in the following format:
```
{
  "first_name": "Ivan",
  "last_name": "Casper",
  "employee_id": "tech-1",
}
```

##### Getting a list of technicians:
To get a list of technicians you'd need to use a `GET` request to `http://localhost:8080/api/technicians/` and it'll show in the following format:
```
{
	"technicians": [
    {
			"first_name": "Ivan",
			"last_name": "Casper",
			"employee_id": "tech-1",
			"id": 1
		}
	]
}
```

##### Deleting a technician:
To remove a technician you'd need to use a `DELETE` request to `http://localhost:8080/api/technicians/:id` and it'll show in the following format:
```
{
	"deleted": true
}
```

## Models:
The service model has 3 models 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
