import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  onToggleTheme: () => void;
}

export default function Layout({ onToggleTheme }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh"  >
      <Header onToggleTheme={onToggleTheme} />
      {/* <Container sx={{ flexGrow: 1, py: 4 }}> */}
      <Container 
        maxWidth={false} disableGutters 
        sx={{
          flexGrow: 1,
          pt: { xs: 2, md: 4 }, 
          pb: { xs: 1, md: 2 }, 
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

