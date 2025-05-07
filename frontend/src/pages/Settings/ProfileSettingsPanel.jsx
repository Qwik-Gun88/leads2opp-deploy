import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileSettingsPanel = () => {
  const [fullName, setFullName] = useState("Fiyaz Totad");
  const email = "fiyaz@leads2opp.com";

  return (
    <Paper
      elevation={3}
      sx={{
        background: "#0f172a",
        color: "#ffffff",
        p: 4,
        mt: 2,
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3} color="#38bdf8">
        👤 Profile Settings
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left - Avatar */}
        <Grid item xs={12} md={3} textAlign="center">
          <Avatar
            sx={{ width: 100, height: 100, margin: "0 auto", mb: 1 }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="body2" color="#cbd5e1">
            Profile picture editing coming soon
          </Typography>
        </Grid>

        {/* Right - Form */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} mb={0.5}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  style: {
                    backgroundColor: "#1e293b",
                    color: "#ffffff",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
  <Typography fontWeight={600} mb={0.5}>
    Email Address
  </Typography>
  <TextField
    fullWidth
    value={email}
    disabled
    variant="outlined"
    InputLabelProps={{ shrink: true }}
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: "#1e293b",
        color: "#ffffff",
      },
      "& .Mui-disabled": {
        WebkitTextFillColor: "#ffffff !important", // ✅ Fixes the greyed-out look
      },
    }}
  />
</Grid>

          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6366f1",
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
              }}
            >
              💾 Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileSettingsPanel;
