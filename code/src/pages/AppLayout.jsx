import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function AppLayout() {
  return (
    <div className="h-[95vh] w-screen">
      <NavBar />
      <div className="mt-[5vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
