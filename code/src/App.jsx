import { useEffect, useState } from "react";
import Helper from "./pages/Helper";

export default function App() {
  // const [id, setId] = useState(() => {
  //   // Check if an id already exists in localStorage
  //   const savedId = localStorage.getItem("app-id");
  //   return savedId || crypto.randomUUID();
  // });

  // useEffect(() => {
  //   // Save the id to localStorage
  //   localStorage.setItem("app-id", id);
  // }, [id]);
  const id = crypto.randomUUID();
  return <Helper id={id} />;
}
