import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          style={{ color: "#feff03" }}
          to="/cities"
        >
          EMBARCA TEST
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cities">
                Cities
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/cities/search">
                Search Cities
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/states">
                States
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

