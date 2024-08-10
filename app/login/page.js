"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { Stack, TextField, Button, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a document for the user if it doesn't exist
      await setDoc(
        doc(firestore, "Users", user.uid),
        {
          email: user.email,
          chatInitialized: false,
        },
        { merge: true }
      );

      // console.log("User Logged In successfully");
      setSnackbarMessage(
        "You have logged in successfully. Please wait while we redirect you to the dashboard."
      );
      setOpenSnackbar(true);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      setSnackbarMessage("Invalid User Details");
      setOpenSnackbar(true); // Open Snackbar on error
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close Snackbar
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          "& > :not(style)": {
            width: {
              xs: "90vw",
              md: "35vw",
            },
            p: 5,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: "12px",
            position: "relative", // Set relative positioning for Paper
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: "absolute", // Absolute positioning for LinearProgress
                top: 0,
                left: 0,
                width: "100%",
                borderRadius: "12px",
                zIndex: 1,
              }}
            />
          )}{" "}
          {/* Show loader when loading */}
          <h2 style={{ textAlign: "center" }}>Log In</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <Stack
              direction={"column"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <TextField
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                fullWidth
              />
              <TextField
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(#033363, #021F3B)",
                }}
              >
                Login
              </Button>
              <Button href="/signup">
                Don&apos;t have an account? Sign Up
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
}
