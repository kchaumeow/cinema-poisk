import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Protected({ children }: { children: JSX.Element }) {
  const user = useSelector(selectUser);
  if (user) return children;
  return <Navigate to="/" />;
}
