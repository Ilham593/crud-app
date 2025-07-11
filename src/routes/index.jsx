import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "../components/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
