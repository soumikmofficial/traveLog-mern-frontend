import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";
import { MapProvider } from "./context/mapContext";

ReactDOM.render(
  <>
    <AppProvider>
      <MapProvider>
        <App />
      </MapProvider>
    </AppProvider>
  </>,
  document.getElementById("root")
);
