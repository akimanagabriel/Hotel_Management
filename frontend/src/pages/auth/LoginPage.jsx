import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ width: "90px", height: "90px" }}>
          <LockOutlinedIcon sx={{ fontSize: "38px" }} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <form style={{ width: "100%" }}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            size='large'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ marginTop: 3 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
