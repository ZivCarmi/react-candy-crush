import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ScoreProvider from "./components/ScoreProvider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScoreProvider>
      <App />
      <Toaster />
    </ScoreProvider>
  </React.StrictMode>
);
