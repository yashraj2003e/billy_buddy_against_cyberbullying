import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Auth from "./Auth";
import Community from "./Community";
import ErrorPage from "./ErrorPage";
import Home from "./Chat";
import { Suspense } from "react";
import DataContext from "../contexts/DataContext";
import Evidence from "./Evidence";
import WhatWeDo from "./WhatWeDo";
import Chat from "./Chat";

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
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "/what-we-do",
          element: <WhatWeDo />,
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
