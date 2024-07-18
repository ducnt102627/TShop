import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import "style.css"
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" duration={1500} />
        </BrowserRouter>
    </React.StrictMode>,
);
