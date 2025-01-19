import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";

function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [authError, setAuthError] = useState("");
  const { userLoggedIn } = useDataContext();
  const [location, setLocation] = useState(() => {
    if (localStorage.getItem("location")) {
      return JSON.parse(localStorage.getItem("geoLocation"));
    } else {
      return { latitude: null, longitude: null };
    }
  });

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    const showPosition = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      localStorage.setItem(
        "geoLocation",
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () =>
          console.log("Unable to fetch location !")
        );
      }
    };
    if (!location.latitude) {
      getLocation();
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const pass = formData.get("password");
    if (isSignUp) {
      await doCreateUserWithEmailAndPassword(email, pass)
        .then(() => navigate("/chat"))
        .catch((e) => {
          if (e.code === "auth/weak-password") {
            setAuthError("Password should be at least 6 characters long!");
          } else if (e.code === "auth/email-already-in-use") {
            setAuthError("This email is already registered!");
          } else if (e.code === "auth/invalid-email") {
            setAuthError("The email address is not valid!");
          } else {
            setAuthError("An unexpected error occurred. Please try again.");
          }
        });
    } else {
      await doSignInWithEmailAndPassword(email, pass)
        .then(() => navigate("/chat"))
        .catch((e) => {
          if (e.code === "auth/invalid-credential") {
            setAuthError("Invalid Credentials !");
          } else {
            setAuthError("Some error Occurred !");
          }
        });
    }
  };

  const handleGoogleSignIn = async () => {
    await doSignInWithGoogle()
      .then(() => navigate("/chat"))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex justify-center items-center h-[90vh] text-xl">
      <div className="border-2 rounded-lg border-gray-150 p-12 space-y-8">
        <div className="flex justify-center border-2 rounded-lg bg-gray-100 p-2">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            className="h-[2rem]"
          />
          <button onClick={handleGoogleSignIn} className="text-xl">
            Sign in with Google
          </button>
        </div>
        <div className="flex justify-center space-x-8">
          <button
            onClick={() => setIsSignUp(true)}
            disabled={isSignUp}
            className={`${
              isSignUp ? "bg-yellow-300" : ""
            } py-2 px-4 rounded-md`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            disabled={!isSignUp}
            className={`${
              !isSignUp ? "bg-yellow-300" : ""
            } py-2 px-4 rounded-md`}
          >
            Sign In
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2"
            required
          />
          <button className="p-2 rounded-md bg-slate-200 hover:bg-slate-500 hover:text-white">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-red-400 text-center min-h-[2rem]">{authError}</p>
      </div>
    </div>
  );
}

export default Auth;
