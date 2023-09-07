import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { useDispatch } from "react-redux";
import {
   Box,
   Typography,
   FormGroup,
   FormControlLabel,
   Button,
   Stack,
   Checkbox,
} from "@mui/material";
import axios from "axios";
import { handleError, parameter } from "src/config/parameters";
import { login, logout } from "src/redux/userSlice";

const AuthLogin = ({ title, subtitle, subtext }) => {
   const dispatch = useDispatch();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorText, setError] = useState("");

   const navigate = useNavigate(); // Get the navigate function

   // call login api
   async function handleLogin() {
      try {
         const { data } = await axios.post(parameter.SERVER_URL + "/signin", {
            email,
            password,
         });
         dispatch(login(data?.user));
         //   set token to local storage
         window.localStorage.setItem("token", data?.token);
         setError("");
         navigate("/dashboard");
      } catch (err) {
         dispatch(logout());
         setError(handleError(err));
      }
   }

   useEffect(() => {
      if (window.localStorage.getItem("token")?.length > 0) {
         return <Navigate to={"/dashboard"} />;
      }
   }, []);

   return (
      <>
         {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
               {title}
            </Typography>
         ) : null}

         {subtext}

         <Stack>
            <Box>
               <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
               >
                  Username
               </Typography>
               <CustomTextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="username"
                  variant="outlined"
                  size="small"
                  fullWidth
               />
            </Box>
            <Box>
               {errorText.length > 0 && (
                  <Typography my={0} color={"error"} variant="p">
                     {errorText}
                  </Typography>
               )}
            </Box>
            <Box mt="25px">
               <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
               >
                  Password
               </Typography>
               <CustomTextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  id="password"
                  type="password"
                  variant="outlined"
                  fullWidth
               />
            </Box>

            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
               <FormGroup>
                  <FormControlLabel
                     control={<Checkbox defaultChecked />}
                     label="Remeber this Device"
                  />
               </FormGroup>
               <Typography
                  component={Link}
                  to="/"
                  fontWeight="500"
                  sx={{
                     textDecoration: "none",
                     color: "primary.main",
                  }}
               >
                  Forgot Password ?
               </Typography>
            </Stack>
         </Stack>
         <Box>
            <Button
               onClick={handleLogin}
               size="small"
               color="primary"
               variant="contained"
               fullWidth
               type="submit"
            >
               Sign In
            </Button>
         </Box>
         {subtitle}
      </>
   );
};

export default AuthLogin;
