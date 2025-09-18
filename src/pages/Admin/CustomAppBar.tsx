import { AppBar, TitlePortal } from 'react-admin';
import { Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import {ROUTE} from '../../router'

export const CustomAppBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <TitlePortal />
      <Box sx={{ flex: 1 }} />
      
      <Button
        color="inherit"
        startIcon={<HomeIcon />}
        onClick={() => navigate(ROUTE.HOME)}
        sx={{ mr: 1 }}
      >
        Home
      </Button>
    </AppBar>
  );
};