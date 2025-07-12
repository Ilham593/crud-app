import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../App";
import ProfilePage from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoutes";
import RootRedirect from "../components/RoorRedirect";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootRedirect />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
