import { useRef, useState } from "react";

const MobileSidebar = ({ setShowSidebar }) => {
  let page = location.pathname.split("/")[2];
  const [activePage, setActivePage] = useState(page.replace("-", " "));

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
    <div
      className="sidebar-menu-mobile block md:hidden relative mb-5"
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
  );
};

export default MobileSidebar;
