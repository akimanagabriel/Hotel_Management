import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { handleError, parameter } from "../../config/parameters";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setError] = useState("");

  // call login api
  async function handleLogin() {
    try {
      const { data } = await axios.post(parameter.SERVER_URL + "/signin", {
        email,
        password,
      });
      dispatch(login(data.user));
      //   set token to local storage
      window.localStorage.setItem("token", data.token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      dispatch(logout());
      setError(handleError(err));
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container component='main' maxWidth='xs'>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: "90px", height: "90px" }}>
              <LockOutlinedIcon sx={{ fontSize: "38px" }} />
            </Avatar>

            <Typography component='h3' variant='h5'>
              Sign In
            </Typography>

            {errorText.length > 0 && (
              <Typography my={0} color={"error"} variant='p'>
                {errorText}
              </Typography>
            )}

            <Box style={{ width: "100%" }}>
              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                size='large'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                style={{ marginTop: 3 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
