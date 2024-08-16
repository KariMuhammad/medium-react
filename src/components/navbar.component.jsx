import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth-context";
import logo from "../imgs/logo.png";

import UserNavigationPanel from "./user-navigation.component";
import { search } from "../services/blog-endpoints";

const Navbar = () => {
  const authContext = useAuth();
  const [visibleSearchBox, setVisibleSearchBox] = useState("hide");
  const [visibleUserPanel, setVisibleUserPanel] = useState(false);

  const navigate = useNavigate();

  const toggleSearchBox = () => {
    setVisibleSearchBox((state) => (state === "hide" ? "show" : "hide"));
  };

  const togglePanel = () => setVisibleUserPanel((state) => !state);
  const hidePanel = () => setVisibleUserPanel(false);

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query && e.key === "Enter") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10">
        <img src={logo} className="w-full" />
      </Link>

      <div
        className={`md-search-box absolute left-0 top-full w-full border-b border-grey py-6 px-[5vh] bg-white mt-0 md:relative md:block md:inset-0 md:w-auto ${visibleSearchBox} md:show`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-4 px-12 rounded-full bg-grey"
            onKeyDown={handleSearch}
          />

          <i className="search-icon fi fi-rr-search text-xl text-dark-grey absolute top-1/2 left-[90%] -translate-y-1/2 md:left-4"></i>
        </div>
      </div>

      <div className="relative flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="flex md:hidden search-icon bg-grey w-12 h-12 rounded-full items-center justify-center"
          onClick={toggleSearchBox}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>

        <Link to="/editor" className="hidden md:flex link  gap-2">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        {authContext.user ? (
          <>
            <Link to="/account/notifications" className="block link">
              <i className="fi fi-rr-bell"></i>
            </Link>

            <div
              className="block link h-14"
              tabIndex={0}
              onClick={togglePanel}
              // onBlur={hidePanel}
            >
              <img
                className="w-full h-full object-cover"
                src={authContext.user.user.personal_info.profile_img}
              />

              {visibleUserPanel && <UserNavigationPanel />}
            </div>
          </>
        ) : (
          <>
            <Link to="/auth/sign-in" className="btn-dark">
              Sign in{" "}
            </Link>

            <Link to="/auth/sign-up" className="btn-light hidden md:block">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
