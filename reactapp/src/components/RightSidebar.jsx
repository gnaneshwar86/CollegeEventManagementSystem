import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, List, ListItem, Typography } from "@mui/material";

function RightSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "HOME", path: "/" },
    { text: "EVENTS", path: "/events" },
    { text: "STUDENTS", path: "/students" },
    { text: "DASHBOARD", path: "/dashboard" },
    { text: "LOGIN", path: "/login" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: "15vw",
        position: "fixed",
        top: "10vh", // below navbar
        right: 0,
        bottom: 0,
        backgroundColor: "#00809D",
        paddingTop: "1rem",
        zIndex: 1000,
        borderRadius: 0,
        color: "#FFD700",
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0.75rem 1rem",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#FFD700",
                color: "#00809D",
              },
            }}
            onClick={() => navigate(item.path)}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "inherit", // keeps hover color
                textAlign: "center",
              }}
            >
              {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RightSidebar;
