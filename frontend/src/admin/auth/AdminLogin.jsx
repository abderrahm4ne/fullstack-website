import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from 'axios'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try{
        const response = axios.post(`${import.meta.env.VITE_API_URL}/api/users/admin/login`, { formData}, { withCredentials: true })  
        console.log('response: ', response);
        console.log("Admin login:", formData);

        if (response.status === 200) {
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
        background: "#111",
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

        <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#f8f3e9" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{
                fieldset: { borderColor: "#f8f3e9" },
                "&:hover fieldset": { borderColor: "#d4af37 !important" },
                "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
              }}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#f8f3e9" } }}
              inputProps={{ style: { color: "white" } }}
              sx={{
                fieldset: { borderColor: "#f8f3e9" },
                "&:hover fieldset": { borderColor: "#d4af37 !important" },
                "&.Mui-focused fieldset": { borderColor: "#d4af37 !important" },
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
