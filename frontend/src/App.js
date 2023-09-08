import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Router from "./routes/Router";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { baselightTheme } from "./theme/DefaultColors";
import { generatePalette } from "./theme/getPallete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parameter } from "./config/parameters";
import axios from "axios";
import { login } from "./redux/userSlice";

function App() {
   const dispatch = useDispatch();
   const token = window.localStorage.getItem("token");

   // get current logged user
   useEffect(() => {
      if (token) {
         retrieveLoggedUser();
      }
   }, [token]);

   const colorMode = useSelector((state) => state.theme.mode);
   const theme = createTheme(generatePalette(colorMode));

   async function retrieveLoggedUser() {
      const { data } = await axios.get(parameter.SERVER_URL + "/api/auth", {
         headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(login(data));
   }

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Router authVerify={token?.length > 0} />
         {/* initialise toastify */}
         <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
   );
}

export default App;
