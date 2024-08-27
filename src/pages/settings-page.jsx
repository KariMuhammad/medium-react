import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/sidenavbar.component";

const Settings = () => {
  let page = location.pathname.split("/")[2];
  const [activePage, setActivePage] = useState(page.replace("-", " "));
  const [showSidebar, setShowSidebar] = useState(false);

  const handlePageChange = (page) => (e) => {
    const { offsetWidth, offsetLeft } = e.target;

    lineRef.current.style.width = `${offsetWidth}px`;
    lineRef.current.style.left = `${offsetLeft}px`;

    setActivePage(page.replace("-", " "));

    if (e.target === sidebarIconRef.current) {
      setShowSidebar((prev) => !prev);
    } else {
      setShowSidebar(false);
    }
  };

  const lineRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarIconRef = useRef(null);

  return (
    <main className="relative flex flex-col justify-center md:justify-normal md:flex-row gap-7 p-10">
      <div
        className="sidebar-menu-mobile block md:hidden relative mb-10"
        onClick={handlePageChange(activePage)}
      >
        <button className="my-4 mr-4" ref={sidebarIconRef}>
          <i className="fi fi-rr-menu-burger pointer-events-none"></i>
        </button>

        <button className="text-xl capitalize" ref={sidebarRef}>
          {activePage}
        </button>

        <hr
          className="absolute bottom-0 block md:hidden border-black"
          ref={lineRef}
        />
      </div>

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
