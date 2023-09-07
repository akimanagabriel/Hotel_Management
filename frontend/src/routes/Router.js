import { Route, Routes, Navigate } from "react-router-dom";

/* Import your components */
import FullLayout from "../layouts/full/FullLayout";
import BlankLayout from "../layouts/blank/BlankLayout";

import Dashboard from "../views/dashboard/Dashboard";
import SamplePage from "../views/sample-page/SamplePage";
import Icons from "../views/icons/Icons";
import TypographyPage from "../views/utilities/TypographyPage";
import Shadow from "../views/utilities/Shadow";
import Error from "../views/authentication/Error";
import Register from "../views/authentication/Register";
import Login from "../views/authentication/Login";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = ({ authVerify }) => (
   <Routes>
      {/* index route */}
      <Route index element={<Navigate to="/auth/login" />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoutes isLogged={authVerify} />}>
         <Route element={<FullLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sample-page" element={<SamplePage />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/ui/typography" element={<TypographyPage />} />
            <Route path="/ui/shadow" element={<Shadow />} />
            <Route path="*" element={<Navigate to="/auth/404" />} />
         </Route>
      </Route>

      {/* Authentication routes */}
      <Route path="/auth/" element={<BlankLayout />}>
         <Route path="register" element={<Register />} />
         <Route path="404" element={<Error />} />
         <Route path="login" element={<Login />} />
         <Route path="*" element={<Navigate to="/auth/404" />} />
      </Route>

      {/* Redirect unknown routes to a 404 page */}
      <Route path="*" element={<Navigate to="/auth/404" />} />
   </Routes>
);

export default Router;
