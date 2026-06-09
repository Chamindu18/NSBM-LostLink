import ReactDOM from "react-dom/client";

import "./index.css";

import AppRouter from "./routes/AppRouter";

import { QueryProvider } from "./providers/QueryProvider";

import { AuthProvider } from "./features/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </AuthProvider>
);