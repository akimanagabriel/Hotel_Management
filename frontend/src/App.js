import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Router from "./routes/Router";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { baselightTheme } from "./theme/DefaultColors";
import { generatePalette } from "./theme/getPallete";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { parameter } from "./config/parameters";
import axios from "axios";
import { login } from "./redux/userSlice";

function App() {
   const [isAuthenticated, setAuthenticated] = useState(
      window.localStorage.getItem("token")?.length > 0,
   );

   useEffect(() => {
      setAuthenticated(window.localStorage.getItem("token")?.length > 0);
   });

   const dispatch = useDispatch();
   // get current logged user
   const token = window.localStorage.getItem("token");
   useEffect(() => {
      if (token) {
         retrieveLoggedUser();
      }
   }, [token]);

   const theme = createTheme(generatePalette("light"));

   async function retrieveLoggedUser() {
      const { data } = await axios.get(parameter.SERVER_URL + "/api/auth", {
         headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(login(data));
   }

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Router authVerify={isAuthenticated} />
         {/* initialise toastify */}
         <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
   );
}

export default App;
