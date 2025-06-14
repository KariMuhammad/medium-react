import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flashSession, lookInSession, storeInSession } from "../common/session";
import { getGuestToken } from "../services/auth-endpoints";

const authContextStructure = {
  user: {
    token: "",
    user: { fullname: "", email: "", username: "", profile_img: "" },
  },
};

export const AuthContext = createContext({
  user: {
    token: "",
    user: { fullname: "", email: "", username: "", profile_img: "" },
  },
  syncUser: (user) => {},
  unsyncUser: () => {},
});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    () => lookInSession("user") || authContextStructure
  );

  const syncUser = (user) => {
    setUser(user);
    storeInSession("user", user);
  };

  const unsyncUser = () => {
    setUser(null);
    flashSession();
    navigate("/auth/sign-in");
  };

  useEffect(() => {
    const _user = lookInSession("user");
    if (_user) setUser(_user);
    else {
      const getGuestUserToken = async () => {
        try {
          const response = await getGuestToken();
          const guestUser = response.data;
          console.log("guestUser", guestUser);

          if (guestUser?.token) {
            setUser(guestUser);
            storeInSession("user", guestUser);
          } else {
            console.error("Failed to get guest user token");
            navigate("/auth/sign-in");
          }
        } catch (error) {
          console.error("Error fetching guest user token:", error);
          flashSession();
          navigate("/auth/sign-in");
        }
      };

      getGuestUserToken();
    }

    console.log("user", _user);
    if (_user && !_user?.token) return navigate("/auth/sign-in");
  }, []);

  return (
    <AuthContext.Provider value={{ user, syncUser, unsyncUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
