import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-screen flex min-h-[5vh] items-center bg-slate-300/100 z-10 fixed">
      <div className="space-x-10 px-5">
        <NavLink
          to="/home"
          className={(e) => `${e.isActive && "text-red-400"}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/community"
          className={(e) => `${e.isActive && "text-red-400"}`}
        >
          Community
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
