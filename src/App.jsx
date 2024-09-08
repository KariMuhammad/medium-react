import { createContext, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import AuthProvider from "./context/auth-context";
import AuthLayout from "./layouts/auth-layout";
import EditorPage from "./pages/editor.page";
import BaseLayout from "./layouts/base-layout";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import NotFoundPage from "./pages/404.page";
import UserProfile from "./pages/profile.page";
import Blog from "./pages/blog.page";
import Settings from "./pages/settings-page";
import ChangePasswordPage from "./pages/change-password.page";
import ProfileEditor from "./pages/edit-profile.page";
import Dashboard from "./pages/dashboard.page";
import NotificationsPage from "./pages/notifications.page";
import BlogManagement from "./pages/manage-blogs.page";
import { lookInSession } from "./common/session";

export const themeContext = createContext({
  theme: "light",
  setTheme: () => {},
});
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = lookInSession("theme");
    document.body.setAttribute("data-theme", theme);
    if (theme) {
      setTheme(theme);
    }
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />

            <Route path="editor" element={<AuthLayout />}>
              <Route index element={<EditorPage />} />
              <Route path=":blog_id/edit" element={<EditorPage />} />
            </Route>

            <Route path="auth" element={<Outlet />}>
              <Route path="sign-in" element={<UserAuthForm type="sign-in" />} />
              <Route path="sign-up" element={<UserAuthForm type="sign-up" />} />
            </Route>

            <Route path="user/:userId" element={<UserProfile />} />
            <Route path="blog/:id" element={<Blog />} />

            <Route path="dashboard" element={<AuthLayout />}>
              <Route path="" element={<Settings />}>
                <Route path="" element={<Dashboard />}>
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="blogs" element={<BlogManagement />} />
                </Route>
              </Route>
            </Route>

            <Route path="settings" element={<AuthLayout />}>
              <Route path="" element={<Settings />}>
                <Route path="edit-profile" element={<ProfileEditor />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
