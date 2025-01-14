import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Auth from "./Auth";
import Community from "./Community";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import { Suspense } from "react";
import DataContext from "../contexts/DataContext";
import Evidence from "./Evidence";

function Helper() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Auth />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "/evidence",
          element: <Evidence />,
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <DataContext>
        <RouterProvider router={router} />
      </DataContext>
    </Suspense>
  );
}

export default Helper;
