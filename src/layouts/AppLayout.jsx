import { Outlet } from "react-router-dom";

import AppNavbar from "../components/AppNavBar.jsx";

const AppLayout = () => {
  return (
    <div>
      <div
        className="d-flex flex-grow-1 bg-light"
        style={{ minHeight: "100vh" }}
      >
        <AppNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
