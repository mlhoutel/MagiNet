import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./components/Board";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Board />
  </QueryClientProvider>
  // </React.StrictMode>
);
