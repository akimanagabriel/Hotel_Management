import { useState } from "react";
import LoginPage from "./pages/auth/LoginPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Page404 from "./pages/notFound/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  // verify if token is exist
  const [isLogged, setLogged] = useState(
    window.localStorage.getItem("token", "")?.length > 0
  );

  return (
    <Routes>
      <Route index element={<LoginPage />} />

      <Route
        path='/dashboard'
        element={<ProtectedRoutes isLogged={isLogged} />}
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* not found route */}
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
