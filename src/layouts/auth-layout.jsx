import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(children);

  useEffect(() => {
    if (!user) navigate("/auth/sign-in");
  }, [user]);

  return <Outlet />;
}
