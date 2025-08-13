// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AppProvider from "./context/AppContext.jsx";
import { MotionConfig } from "motion/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <MotionConfig viewport={{ once: true }}>
          <App />
        </MotionConfig>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
