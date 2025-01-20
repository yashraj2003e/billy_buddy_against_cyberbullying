import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./Home";
import Map from "./Map";
import { useEffect, useState } from "react";

function App() {
  const [evidences, setEvidences] = useState([]);
  const [Cyberbullying, setCyberBullying] = useState([]);
  useEffect(() => {
    async function getEvidence() {
      const result = await fetch("http://localhost:3000/evidence");
      const data = await result.json();

      const detected = data.filter((item) => item.detected);

      setEvidences(data);
      setCyberBullying(detected);
    }

    getEvidence();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home evidences={evidences} />,
        },
        {
          path: "/map",
          element: <Map items={Cyberbullying} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
