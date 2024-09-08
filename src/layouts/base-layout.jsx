import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.component";
import { Toaster } from "react-hot-toast";

export default function BaseLayout() {
  return (
    <div className="container mx-auto bg-white">
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
}
