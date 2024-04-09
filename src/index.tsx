import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "../public/manifest.json";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { cinemasApi } from "./features/api/cinemasSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <ApiProvider api={cinemasApi}>
        <RouterProvider router={router}></RouterProvider>
      </ApiProvider>
    </React.StrictMode>
  </ChakraProvider>,
);

reportWebVitals();
