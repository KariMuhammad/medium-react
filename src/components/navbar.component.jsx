import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth-context";
import logo from "../imgs/logo.png";

import UserNavigationPanel from "./user-navigation.component";
import { getNotificationStatus } from "../services/notification-endpoints";
import { themeContext } from "../App";
import { storeInSession } from "../common/session";

const Navbar = () => {
  const authContext = useAuth();
  const [visibleSearchBox, setVisibleSearchBox] = useState("hide");
  const [visibleUserPanel, setVisibleUserPanel] = useState(false);

  const { theme, setTheme } = useContext(themeContext);

  const changeTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
    storeInSession("theme", theme === "light" ? "dark" : "light");

    document.body.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  const navigate = useNavigate();

  const toggleSearchBox = () => {
    setVisibleSearchBox((state) => (state === "hide" ? "show" : "hide"));
  };

  const togglePanel = () => setVisibleUserPanel((state) => !state);

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query && e.key === "Enter") {
      navigate(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    if (authContext.user && authContext.user.token)
      getNotificationStatus(authContext.user.token).then((data) => {
        authContext.syncUser({
          ...authContext.user,
          notifications_available: data.new_notifications,
        });
      });
  }, [authContext.user?.token]);

  const { notifications_available } = authContext.user || {};

  return (
    <nav className="navbar z-50">
      <Link to="/" className="flex-none w-10">
        <img src={logo} className={`logo ${theme === "dark" && "invert "}`} />
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

        <button onClick={changeTheme} className="block btn-light relative">
          <i className="fi fi-rr-moon"></i>
        </button>

        {authContext.user?.token ? (
          <>
            <Link to="/dashboard/notifications" className="block link relative">
              <i className="fi fi-rr-bell"></i>

              {notifications_available && (
                <span className="absolute right-2 top-2 w-3 h-3 rounded-full bg-red"></span>
              )}
            </Link>

            <div
              className="block link h-14"
              tabIndex={0}
              onClick={togglePanel}
              // onBlur={hidePanel}
            >
              <img
                className="w-full h-full object-cover"
                src={authContext.user.user.profile_img}
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
