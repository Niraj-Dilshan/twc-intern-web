import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "./assets/fonts/futura_medium_bt.ttf";
import "./assets/fonts/futura_light_bt.ttf";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
 <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
 </React.StrictMode>
);