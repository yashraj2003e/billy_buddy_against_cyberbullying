import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

function AppLayout() {
  return (
    <div className="w-screen">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
