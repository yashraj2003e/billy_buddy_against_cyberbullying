import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useDataContext } from "../contexts/DataContext";
import { doSignInWithGoogle } from "../firebase/auth";

function NavBar() {
  const { userLoggedIn } = useDataContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (userLoggedIn) {
      auth.signOut();
      localStorage.removeItem("user");
      localStorage.removeItem("locationName");
    } else {
      await doSignInWithGoogle().then(() => navigate("home"));
    }
  };

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
        <NavLink
          to="/evidence"
          className={(e) => `${e.isActive && "text-white"}`}
        >
          Evidence Submission
        </NavLink>
        <button onClick={handleLogout}>
          {userLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
