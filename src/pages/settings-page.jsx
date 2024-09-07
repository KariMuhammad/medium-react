import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/sidenavbar.component";
import MobileSidebar from "../components/mobile-sidebar.component";

const Settings = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <main className="relative flex flex-col justify-center md:justify-normal md:flex-row gap-7 p-10">
      <MobileSidebar setShowSidebar={setShowSidebar} />

      <SideNavbar showSidebar={showSidebar} />

      {!showSidebar && (
        <main className="content w-full">
          <Outlet />
        </main>
      )}
    </main>
  );
};

export default Settings;
