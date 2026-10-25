
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/home" className="logo" aria-label="KnowSphere AI home">
        <span className="navbar-logo-symbol">✳</span>
        <span className="navbar-logo-text">
          KnowSphere <span>AI</span>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Upload
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Ask AI
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Documents
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
