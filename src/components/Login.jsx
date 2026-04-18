import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { loginRequest } from "../api/auth";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack
} from "@mui/material";

function Login({ onLogin }) {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {

      // Save JWT
      localStorage.setItem("token", data.token);

      // Notify parent
      onLogin();

    }
  });

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (

    <Paper sx={{ p:4, maxWidth:400, margin:"100px auto" }}>

      <Typography variant="h5" sx={{ mb:2 }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>

        <Stack spacing={2}>

          <TextField
            label="Username"
            value={form.username}
            onChange={(e)=>handleChange("username",e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e)=>handleChange("password",e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isLoading}
          >
            Login
          </Button>

          {mutation.isError && (
            <Typography color="error">
              Invalid username or password
            </Typography>
          )}

        </Stack>

      </form>

    </Paper>

  );
}

export default Login;
