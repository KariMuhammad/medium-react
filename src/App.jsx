import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import AuthProvider from "./context/auth-context";
import AuthLayout from "./layouts/auth-layout";
import EditorPage from "./pages/editor.page";
import BaseLayout from "./layouts/base-layout";
import HomePage from "./pages/home.page";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="editor" element={<AuthLayout />}>
            <Route index element={<EditorPage />} />
          </Route>

          <Route path="auth" element={<Outlet />}>
            <Route path="sign-in" element={<UserAuthForm type="sign-in" />} />
            <Route path="sign-up" element={<UserAuthForm type="sign-up" />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
