import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const dataContext = createContext();

export default function DataContext({ children }) {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  });
  const [loading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setId(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      // console.log(user);
      setUserLoggedIn(true);
      await fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.uid,
        }),
      });
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
  }

  return (
    <dataContext.Provider
      value={{ data, setData, id, currentUser, userLoggedIn, loading }}
    >
      {children}
    </dataContext.Provider>
  );
}

function useDataContext() {
  const value = useContext(dataContext);
  if (value === undefined)
    throw new Error("Context is being used outside scope !");
  return value;
}

export { useDataContext };
