import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

fetch("/appsettings.json")
  .then((res) => res.json())
  .then((data) => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App webServiceBaseUrl={data.BASE_URL} />
      </React.StrictMode>
    );
  });
