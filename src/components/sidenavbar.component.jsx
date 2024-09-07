import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const SideNavbar = ({ showSidebar }) => {
  const {
    user: { notifications_available },
  } = useAuth();

  return (
    <div
      className={clsx({
        "sidebar-nav": true,
        "max-md:hidden max-md:invisible max-md:opacity-0": !showSidebar,
        "block visible opacity-100": showSidebar,
      })}
    >
      <div className="sticky top-[80px] z-30">
        <div className="md:sticky min-w-[200px] h-[calc(100vh-260px)] md:h-cover top-24 overflow-y-auto">
          <main>
            <div className="side-section">
              <h4 className="text-xl">Dashboard</h4>
              <hr className="border-black -ml-6 mr-6" />

              <nav className="py-4">
                <NavLink to="/dashboard/blogs" className="sidebar-link">
                  <i className="fi fi-rr-document"></i>
                  <span>Blogs</span>
                </NavLink>

                <NavLink to="/dashboard/comments" className="sidebar-link">
                  <i className="fi fi-rr-comment-alt"></i>
                  <span>Comments</span>
                </NavLink>

                <NavLink
                  to="/dashboard/notifications"
                  className="sidebar-link relative"
                >
                  <i className="fi fi-rr-bell"></i>
                  Notifications
                  {notifications_available && (
                    <span className="absolute left-2 top-2 w-3 h-3 rounded-full bg-red"></span>
                  )}
                </NavLink>
              </nav>
            </div>

            <div className="side-section my-4">
              <h4 className="text-xl">Settings</h4>
              <hr className="border-black -ml-6 mr-6" />

              <nav className="py-4">
                <NavLink to="/settings/edit-profile" className="sidebar-link">
                  <i className="fi fi-rr-user-pen"></i>
                  Edit Profile
                </NavLink>

                <NavLink
                  to="/settings/change-password"
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-key"></i>
                  Change Password
                </NavLink>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
