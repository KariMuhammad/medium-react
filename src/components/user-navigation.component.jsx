import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useAuth } from "../context/auth-context";

const UserNavigationPanel = () => {
  const { user, unsyncUser } = useAuth();

  const logout = (e) => {
    e.preventDefault();
    unsyncUser();
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      initial={{ translateY: -10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: -10, opacity: 0 }} // cannot notice, because this component is conditionally rendered (so, it's unmounted)
      className="absolute z-50 top-full left-0 w-full bg-white opacity-100 border border-grey rounded-b-lg"
    >
      <div className="bg-white z-50">
        <Link
          to={`/user/${user.user.username}`}
          className="block p-2 text-black hover:text-yellow-500"
        >
          Account
        </Link>

        <Link
          to="/settings/edit-profile"
          className="block p-2 text-black hover:text-yellow-500"
        >
          Settings
        </Link>

        <button
          onClick={logout}
          className="w-full block  text-black hover:text-yellow-500 overflow-hidden"
        >
          <h4 className="text-left p-2 text-lg text-black">Sign out</h4>
          <span className="text-dark-grey text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            @{user.user.username}
          </span>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
