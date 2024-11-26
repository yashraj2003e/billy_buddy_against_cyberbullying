import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import AppLayout from "./pages/AppLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Community from "./pages/Community.jsx";
import DataContext from "./contexts/DataContext.jsx";

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

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <DataContext>
        <RouterProvider router={router} />
      </DataContext>
    </Suspense>
  );
}
