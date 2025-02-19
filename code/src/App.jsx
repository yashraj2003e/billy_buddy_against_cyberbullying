import { useEffect } from "react";
import Routes from "./pages/Routes";

export default function App() {
  useEffect(() => {
    const handleClearLocalStorage = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("locationName");
      localStorage.removeItem("geoLocation");
    };

    window.addEventListener("beforeunload", handleClearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", handleClearLocalStorage);
    };
  }, []);

  return <Routes />;
}
