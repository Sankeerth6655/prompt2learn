import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProtectedLayout() {
  let token = localStorage.getItem("token");
  if(!token) return <Navigate to='/auth' replace/>
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}