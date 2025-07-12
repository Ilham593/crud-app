import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RootRedirect() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RootRedirect;
