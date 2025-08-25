// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Tooltip,
//   IconButton,
//   Typography,
//   Button,
//   useScrollTrigger,
//   Slide,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import {
//   LightMode,
//   DarkMode,
//   Login,
//   Logout,
//   Assessment,
//   Person,
//   Settings,
//   AppRegistration,
//   AdminPanelSettings,
// } from "@mui/icons-material";
// import { Link as RouterLink } from "react-router-dom";
// import { TestMenu } from "../TestMenu";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";
// import logo from '../../../public/logo/donkey_logo.jpg'
// import { getRoleString } from "../../utils";
// import {ROUTE} from '../../router'

// interface Props {
//   onToggleTheme: () => void;
//   showAdminButton?: boolean;
// }

// function HideOnScroll({ children }: { children: React.ReactElement }) {
//   const trigger = useScrollTrigger();
//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// export default function Header({ onToggleTheme }: Props) {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const { isAuthenticated, userData, logout } = useAuth();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
//   //const isAdmin = userData?.role === 'Admin';
//   const roleString = getRoleString(Number(userData?.role));
//   const isAdmin = roleString === 'Admin';
//   console.log (`Header: User.Role ${userData?.role}, IsAdmin: ${isAdmin}`);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleMenuClose();
//     logout();
//   };

//   return (
//     <HideOnScroll>
//       <AppBar
//         position="sticky"
//         color="default"
//         elevation={1}
//         sx={{
//           backgroundColor: theme.palette.background.default,
//           color: theme.palette.text.primary,
//           borderBottom: `1px solid ${theme.palette.divider}`,
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between" }}>

//           {/* Логотип */}
//           <Typography
//   variant="h6"
//   component={RouterLink}
//   to="/"
//   sx={{ 
//     textDecoration: 'none', 
//     display: 'flex',
//     alignItems: 'center',
//     gap: 1
//   }}
// >
//   <Box 
//     component="img"
//     src={logo}
//     alt="Логотип"
//     sx={{ 
//       height: 'auto', 
//       width: 'auto',
//       borderRadius: '0.5vw',
//       maxHeight: { xs: 30, md: 60 } 
//     }}
//   />
//   {!isMobile && (
//     <Box sx={{
//       display: 'inline-flex',
//       background: 'linear-gradient(90deg, #1976d2 0%, #ff5722 100%)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       fontWeight: 700,
//       fontSize: '1.5rem'
//     }}>
//       <Box component="span" sx={{ color: '#1976d2' }}>Тест</Box>
//       <Box component="span" sx={{ color: '#ff5722' }}>Платформа</Box>
//     </Box>
//   )}
// </Typography>

//           {/* Навигация */}
//           {!isMobile && (
//             <Box sx={{ display: "flex", gap: 3 }}>
//               <Button component={RouterLink} to={ROUTE.HOME} color="inherit" sx={{ fontSize: "1.2rem" }}>
//                 Головна
//               </Button>
//               <Button component={RouterLink} to={ROUTE.SUBJECTINTRO} color="inherit" sx={{ fontSize: "1.2rem" }}>
//                 Предмети
//               </Button>
//               <Button component={RouterLink} to={ROUTE.TESTEXAMRULES} color="inherit" sx={{ fontSize: "1.2rem" }}>
//                 Правила тестування
//               </Button>
//               <TestMenu />
//               <Button component={RouterLink} to={ROUTE.ABOUT} color="inherit" sx={{ fontSize: "1.2rem" }}>
//                 Про платформу
//               </Button>
//             </Box>
//           )}

//           {/* Кнопки справа */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Tooltip title="Змінити тему">
//               <IconButton onClick={onToggleTheme} color="inherit">
//                 {isDark ? <LightMode sx={{ fontSize: "1.5vw" }} /> : <DarkMode sx={{ fontSize: "1.5vw" }} />}
//               </IconButton>
//             </Tooltip>

//             {isAuthenticated ? (
//               <>
//                 <Tooltip title="Особистий кабінет">
//                   <IconButton
//                     onClick={handleMenuOpen}
//                     color="inherit"
//                     sx={{ p: 0 }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 32,
//                         height: 32,
//                         bgcolor: theme.palette.primary.main,
//                         fontSize: "0.875rem",
//                       }}
//                     >
//                       {userData?.username?.charAt(0).toUpperCase() || 
//                        userData?.email?.charAt(0).toUpperCase()}
//                     </Avatar>
//                   </IconButton>
//                 </Tooltip>

//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   PaperProps={{
//                     elevation: 3,
//                     sx: {
//                       mt: 1.5,
//                       minWidth: 200,
//                     },
//                   }}
//                 >
//                   <MenuItem
//                     component={RouterLink}
//                     to="/profile"
//                     onClick={handleMenuClose}
//                   >
//                     <Person sx={{ mr: 1 }} /> Профіль
//                   </MenuItem>

//                   <MenuItem
//                     component={RouterLink}
//                     to="/profile-results"
//                     onClick={handleMenuClose}
//                   >
//                     <Assessment sx={{ mr: 1 }} /> Сесії користувача
//                   </MenuItem>

//                   <MenuItem
//                     component={RouterLink}
//                     to="/profile-settings"
//                     onClick={handleMenuClose}
//                   >
//                     <Settings sx={{ mr: 1 }} /> Налаштування
//                   </MenuItem>
//                   <Divider />
//                   <MenuItem onClick={handleLogout}>
//                     <Logout sx={{ mr: 1 }} /> Вийти
//                   </MenuItem>
//                 </Menu>
//                 {isAdmin && (
//                 <Tooltip title="Адмін панель">
//                   <IconButton 
//                     component={RouterLink} 
//                     to="/admin" 
//                     color="inherit"
//                     sx={{ mr: 1 }}
//                   >
//                   <AdminPanelSettings sx={{ fontSize: "1.5vw" }} />
//                   </IconButton>
//               </Tooltip>
//             )}
//               </>
//             ) : (
//           <>
//               <Tooltip title="Увійти">
//                 <IconButton component={RouterLink} to="/login" color="inherit">
//                   <Login sx={{ fontSize: "1.5vw" }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title="Зареєструватися">
//                 <IconButton component={RouterLink} to="/register" color="inherit">
//                   <AppRegistration sx={{ fontSize: "1.5vw" }} />
//                 </IconButton>
//               </Tooltip>
//           </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </HideOnScroll>
//   );
// }




import {
  Box,
  Tooltip,
  IconButton,
  Typography,
  Button,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  Login,
  Logout,
  Assessment,
  Person,
  Settings,
  AppRegistration,
  AdminPanelSettings,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { TestMenu } from "../TestMenu";
import { TestMenuMobile } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import logo from "../../../public/logo/donkey_logo.jpg";
import { getRoleString } from "../../utils";
import { ROUTE } from "../../router";
import {
  StyledAppBar,
  StyledToolbar,
  LogoWrapper,
  LogoImg,
  LogoText,
  NavWrapper,
  NavButton,
  RightControls,
  DrawerContainer,
  StyledListItemButtonWithRouter,
  StyledListItemText,
} from "./HeaderStyles";

interface Props {
  onToggleTheme: () => void;
  showAdminButton?: boolean;
}

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header({ onToggleTheme }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, userData, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const roleString = getRoleString(Number(userData?.role));
  const isAdmin = roleString === "Admin";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleMobileMenuClose = () => {
      setDrawerOpen(false);
    };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <HideOnScroll>
      <StyledAppBar>
        <StyledToolbar>
          {/* Логотип */}
          <LogoWrapper
            variant="h6"
            component={RouterLink}
            to="/"
          >
            <LogoImg
              src={logo}
              alt="Логотип"
            />
            {!isMobile && (
              <LogoText>
                <Box component="span" sx={{ color: "#1976d2" }}>
                  Тест
                </Box>
                <Box component="span" sx={{ color: "#ff5722" }}>
                  Платформа
                </Box>
              </LogoText>
            )}
          </LogoWrapper>

          {/* Навигация */}
          {!isMobile && (
            <NavWrapper>
              <NavButton component={RouterLink} to={ROUTE.HOME}>
                Головна
              </NavButton>
              <NavButton component={RouterLink} to={ROUTE.SUBJECTINTRO}>
                Предмети
              </NavButton>
              <NavButton component={RouterLink} to={ROUTE.TESTEXAMRULES}>
                Правила тестування
              </NavButton>
              
              {/* открывающееся меню */}
              <TestMenu /> 

              <NavButton component={RouterLink} to={ROUTE.ABOUT}>
                Про платформу
              </NavButton>
            </NavWrapper>
          )}

          {/* Кнопки справа */}
          <RightControls>
            <Tooltip title="Змінити тему">
              <IconButton onClick={onToggleTheme} color="inherit">
                {isDark ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {isAuthenticated ? (
              <>
                <Tooltip title="Особистий кабінет">
                  <IconButton onClick={handleMenuOpen} color="inherit" sx={{ p: 0 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                      {userData?.username?.charAt(0).toUpperCase() ||
                        userData?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                    <Person sx={{ mr: 1 }} /> Профіль
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/profile-results" onClick={handleMenuClose}>
                    <Assessment sx={{ mr: 1 }} /> Сесії користувача
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/profile-settings" onClick={handleMenuClose}>
                    <Settings sx={{ mr: 1 }} /> Налаштування
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Вийти
                  </MenuItem>
                </Menu>
                {isAdmin && (
                  <Tooltip title="Адмін панель">
                    <IconButton component={RouterLink} to="/admin" color="inherit">
                      <AdminPanelSettings />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : (
              <>
                <Tooltip title="Увійти">
                  <IconButton component={RouterLink} to="/login" color="inherit">
                    <Login />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Зареєструватися">
                  <IconButton component={RouterLink} to="/register" color="inherit">
                    <AppRegistration />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* Mobile menu */}
            {isMobile && (
              <>
                <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  //onClose={() => setDrawerOpen(false)}
                  onClose={handleMobileMenuClose}
                >
                  <DrawerContainer>
                    <List>
                      <StyledListItemButtonWithRouter to={ROUTE.HOME} onClick={handleMobileMenuClose}>
                        <StyledListItemText primary="Головна" />
                      </StyledListItemButtonWithRouter>
                      <StyledListItemButtonWithRouter to={ROUTE.SUBJECTINTRO} onClick={handleMobileMenuClose}>
                        <StyledListItemText primary="Предмети" />
                      </StyledListItemButtonWithRouter>
                        <StyledListItemButtonWithRouter to={ROUTE.TESTEXAMRULES} onClick={handleMobileMenuClose}>
                      <StyledListItemText primary="Правила тестування" />
                      </StyledListItemButtonWithRouter>
                        <TestMenuMobile onClose={() => setDrawerOpen(false)} />
                      <StyledListItemButtonWithRouter to={ROUTE.ABOUT} onClick={handleMobileMenuClose}>
                        <StyledListItemText primary="Про платформу" />
                      </StyledListItemButtonWithRouter>
                    </List>
                  </DrawerContainer>
                </Drawer>
              </>
            )}
          </RightControls>
        </StyledToolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
}