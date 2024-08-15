import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flashSession, lookInSession, storeInSession } from "../common/session";

export const AuthContext = createContext({
  user: {},
  syncUser: () => {},
  unsyncUser: () => {},
});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => lookInSession("user") || null);

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

    console.log("user", _user);
    if (!_user) return navigate("/auth/sign-in");
  }, []);

  return (
    <AuthContext.Provider value={{ user, syncUser, unsyncUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
