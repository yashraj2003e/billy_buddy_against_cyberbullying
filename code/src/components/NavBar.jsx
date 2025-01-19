import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { doSignInWithGoogle, doSignOut } from "../firebase/auth";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLoggedIn } = useDataContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!userLoggedIn) {
      await doSignInWithGoogle().then(() => navigate("chat"));
    } else {
      await doSignOut();
    }
  };

  return (
    <nav className="bg-blue-600 w-full z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-2 flex items-center">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className={(e) =>
                    ` hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      e.isActive ? "text-white" : "text-gray-300"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/community"
                  className={(e) =>
                    ` hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      e.isActive ? "text-white" : "text-gray-300"
                    }`
                  }
                >
                  Community
                </NavLink>
                <NavLink
                  to="/evidence"
                  className={(e) =>
                    ` hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      e.isActive ? "text-white" : "text-gray-300"
                    }`
                  }
                >
                  Evidence Submission
                </NavLink>
                <NavLink
                  to="/what-we-do"
                  className={(e) =>
                    ` hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      e.isActive ? "text-white" : "text-gray-300"
                    }`
                  }
                >
                  What we Do
                </NavLink>
                <NavLink
                  to="/chat"
                  className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Chat with Billy
                </NavLink>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <button
            className="text-gray-300 hover:text-white font-medium"
            onClick={handleClick}
          >
            {userLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/community"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Community
            </NavLink>
            <NavLink
              to="/evidence"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Evidence Submission
            </NavLink>
            <NavLink
              to="/what-we-do"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              What we Do
            </NavLink>
            <NavLink
              to="/chat"
              className="bg-yellow-500 text-blue-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Chat with Billy
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
