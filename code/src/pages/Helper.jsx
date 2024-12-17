import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Auth from "./Auth";
import Community from "./Community";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import { Suspense } from "react";
import DataContext from "../contexts/DataContext";

function Helper({ id }) {
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
      ],
    },
  ]);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <DataContext id={id}>
        <RouterProvider router={router} />
      </DataContext>
    </Suspense>
  );
}

export default Helper;
