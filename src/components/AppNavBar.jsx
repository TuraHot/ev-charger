import { Link, useLocation } from "react-router-dom";

const AppNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "" && location.pathname === "/") return "active";
    return location.pathname.includes(path) && path !== ""
      ? "active"
      : "text-white";
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{ width: "200px", minHeight: "100vh", backgroundColor: "#5cdf6e" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <i className="bi bi-lightning-charge-fill fs-4 me-2"></i>
        <span className="fs-4">Admin Panel</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to={""} className={`nav-link ${isActive("")} text-white`}>
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to={"station"} className={`nav-link ${isActive("station")}`}>
            <i className="bi bi-geo-alt-fill me-2"></i>
            Station
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to={"payment"} className={`nav-link ${isActive("payment")}`}>
            <i className="bi bi-credit-card-fill me-2"></i>
            Payment
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to={"user"} className={`nav-link ${isActive("user")}`}>
            <i className="bi bi-people-fill me-2"></i>
            User
          </Link>
        </li>
        <li className="nav-item mb-5">
          <Link to={"setting"} className={`nav-link ${isActive("setting")}`}>
            <i className="bi bi-gear-fill me-2"></i>
            Setting
          </Link>
        </li>
      </ul>
      <hr />
      <div className="d-flex gap-3 align-items-center mt-auto justify-content-between">
        <strong>Admin</strong>
        <button className="btn btn-danger btn-sm text-center">Logout</button>
      </div>
    </div>
  );
};

export default AppNavbar;
