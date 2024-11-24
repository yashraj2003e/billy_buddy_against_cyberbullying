import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function AppLayout() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
