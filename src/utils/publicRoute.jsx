import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = useSelector((state) => state.user);
  if (user.idToken) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
