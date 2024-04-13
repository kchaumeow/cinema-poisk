import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "../public/manifest.json";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config });
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </ChakraProvider>,
);

reportWebVitals();
