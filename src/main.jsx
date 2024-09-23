import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>
);
