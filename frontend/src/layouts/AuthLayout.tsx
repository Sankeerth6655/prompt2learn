import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  let token = localStorage.getItem("token");
  if(token){
    return <Navigate to='/dashboard' replace></Navigate>
  }
  return <Outlet />;
}