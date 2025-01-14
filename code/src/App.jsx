import { useEffect } from "react";
import Helper from "./pages/Helper";

export default function App() {
  useEffect(() => {
    const handleClearLocalStorage = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("locationName");
    };

    window.addEventListener("beforeunload", handleClearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", handleClearLocalStorage);
    };
  }, []);

  return <Helper />;
}
