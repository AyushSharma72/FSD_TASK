"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { registerUserAction, loginUserAction } from "../actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const loginToast = toast.loading("Logging in...");

    const data = await loginUserAction({ email, password });

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message || "Login successful!", { id: loginToast });

      router.push("/");
    } else {
      toast.error(data.message || "Login failed", { id: loginToast });
    }
  };

  const handleRegister = async () => {
    const loginToast = toast.loading("registering..");
    const data = await registerUserAction({
      name,
      email: registerEmail,
      password: registerPassword,
    });

    if (data.success) {
      toast.success(data.message || "register successful!", { id: loginToast });
      setIsModalOpen(false);
    } else {
      toast.error(data.message || "registeration failed", { id: loginToast });
    }
  };

  return (
    <Box className="flex justify-center items-center h-[500px]">
      <Paper elevation={4} sx={{ p: 5, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="bg-white"
        >
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setIsModalOpen(true)}
              fullWidth
            >
              Don’t have an account? Register
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Registration Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            className="text-purple-600 m-auto w-full text-center"
          >
            Register
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsModalOpen(false)}
                fullWidth
              >
                Close
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
