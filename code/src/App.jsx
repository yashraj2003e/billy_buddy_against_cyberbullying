import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import AppLayout from "./pages/AppLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";

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
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
