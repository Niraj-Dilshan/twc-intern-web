import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "./assets/fonts/futura_medium_bt.ttf";
import "./assets/fonts/futura_light_bt.ttf";
import { QueryClientProvider } from 'react-query'; // Import QueryClientProvider from react-query
import { queryClient } from './config/queryClient';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
