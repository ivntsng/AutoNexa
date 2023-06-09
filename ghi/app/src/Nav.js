import { NavLink, Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="manufacturerMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manufacturer
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="manufacturerMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/manufacturers">
                    List of Manufacturers
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/manufacturers/new">
                    Create a Manufacturer
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="modelMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Models
              </a>
              <ul className="dropdown-menu" aria-labelledby="modelMenuButton">
                <li>
                  <Link className="dropdown-item" to="/models">
                    List of Models
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/models/create">
                    Create a Vehicle Model
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="automobileMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Automobiles
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="automobileMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/automobiles">
                    List of Automobiles
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/automobiles/create">
                    Create an Automobile
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="techniciansMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technicians
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="techniciansMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/technicians">
                    List of Technicians
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/technicians/create">
                    Add a Technician
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="ServiceMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Service Appointments
              </a>
              <ul className="dropdown-menu" aria-labelledby="ServiceMenuButton">
                <li>
                  <Link className="dropdown-item" to="/appointments">
                    List Service Appointments
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/appointments/create">
                    Create a Service Appointment
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/appointments/history">
                    Service History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="salespeopleMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Salespeople
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="salespeopleMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/salespeople">
                    List of Salespeople
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salespeople/create">
                    Add a Salesperson
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="customersMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Customers
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="customersMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/customers">
                    List of Customers
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customers/create">
                    Add a Customer
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="customersMenuButton"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="customersMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/sales">
                    List of Sales
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sales/create">
                    Record a new sale
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sales/history">
                    Salesperson History
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
