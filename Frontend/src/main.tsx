import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster richColors position="top-right" duration={1500} />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
