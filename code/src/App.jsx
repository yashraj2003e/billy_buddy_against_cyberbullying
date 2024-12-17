import { useEffect } from "react";
import Helper from "./pages/Helper";
import { auth } from "./firebase/firebase";

export default function App() {
  useEffect(() => {
    return () => auth.signOut();
  }, []);

  return <Helper />;
}
