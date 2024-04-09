import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cinema from "./pages/Cinema";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Cinema />,
        path: "/cinemas/:id",
      },
    ],
  },
]);
