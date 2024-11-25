import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-screen flex min-h-[5vh] items-center bg-slate-500/100 z-10 fixed top-0">
      <div className="space-x-10 px-5">
        <NavLink to="/home" className={(e) => `${e.isActive && "text-white"}`}>
          Home
        </NavLink>
        <NavLink
          to="/community"
          className={(e) => `${e.isActive && "text-white"}`}
        >
          Community
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
