import { Outlet } from "react-router";

import { Box, Container, Typography } from "@mui/material";

import { NavButton } from "../components/header/NavButton";

const DefaultLayout = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box
        component="header"
        display="flex"
        p="0.6rem"
        bgcolor={({ palette }) => palette.grey[200]}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h1" fontSize="2.2rem" fontWeight="400">
          Physiotherapy
        </Typography>
        <Box component="nav" display="flex" gap="1rem">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/patients">Patients</NavButton>
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        sx={{ flexGrow: "1", position: "relative", my: "1rem" }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default DefaultLayout;
