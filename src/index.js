import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import ScoreProvider from "./components/ScoreProvider";

ReactDOM.render(
  <React.StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
