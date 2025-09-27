import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from 'axios'
import { emit } from "process";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", email: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try{
        const response = axios.post(`${import.meta.env.VITE_API_URL}/api/users/admin/login`, { credentials}, { withCredentials: true })  
        console.log('response: ', response);
        console.log("Admin login:", credentials);
        setCredentials({email:"", password:""});

        if (res.status === 200) {
            navigate("/secret/admin/dashboard");
        }
    } catch(err){
        console.log('error occured', err);
    }

  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#111", // dark background
        padding: "2rem",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "2.5rem",
          maxWidth: 400,
          width: "100%",
          borderRadius: "16px",
          background: "#1e1e1e",
          border: "1px solid #d4af37",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ color: "#f8f3e9", fontWeight: "600" }}
        >
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
          <TextField
            label="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#f8f3e9" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": { borderColor: "#f8f3e9" },
                "&:hover fieldset": { borderColor: "#d4af37" },
                "&.Mui-focused fieldset": { borderColor: "#d4af37" },
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#f8f3e9" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": { borderColor: "#f8f3e9" },
                "&:hover fieldset": { borderColor: "#d4af37" },
                "&.Mui-focused fieldset": { borderColor: "#d4af37" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              marginTop: "1.5rem",
              backgroundColor: "#750202",
              color: "#f8f3e9",
              fontWeight: "600",
              padding: "12px",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
