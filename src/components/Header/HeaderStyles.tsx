import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  ListItemButton,
  ListItemText,
  type TypographyProps,
  type ButtonProps,
  type ListItemButtonProps
} from "@mui/material";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

// export const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   position: "sticky",
//   color: "default",
//   elevation: 1,
//   backgroundColor: theme.palette.background.paper,
// }));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  elevation: 0,  // прибираємо тінь
  backgroundColor: theme.palette.background.default,  // ← використовуємо той самий фон, що й сторінка
  borderBottom: `1px solid ${theme.palette.divider}`,  // ← легка рамка для відділення
  // або замість рамки - легка тінь знизу:
  // boxShadow: `0 1px 2px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1, 2),
}));

export const LogoWrapper = styled(Typography)<TypographyProps>(() => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "inherit",
  "&:hover": {
    color: "inherit",
  },
})) as typeof Typography;

export const LogoImg = styled("img")(() => ({
  height: 40,
  width: 40,
  borderRadius: "50%",
}));

// Текст логотипа
export const LogoText = styled(Box)(() => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  gap: 4, 
  fontSize: "1.1rem",
  fontWeight: "bold",
}));

export const NavWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

// Кнопки навигации 
export const NavButton = styled(Button)<ButtonProps>(() => ({
  color: "inherit",
  textTransform: "none",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
})) as typeof Button;

export const RightControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 250,
  padding: theme.spacing(2),
}));


// Типизируем StyledListItemButton с поддержкой component prop
export const StyledListItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
})) as typeof ListItemButton;

// Альтернативно: создаем кастомный компонент с правильной типизацией
export interface StyledListItemButtonWithRouterProps extends ListItemButtonProps {
  to: string;
  component?: React.ElementType;
}

export const StyledListItemButtonWithRouter = styled(
  ({ to, children, ...props }: StyledListItemButtonWithRouterProps) => (
    <ListItemButton component={RouterLink} to={to} {...props}>
      {children}
    </ListItemButton>
  )
)<StyledListItemButtonWithRouterProps>(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  "& .MuiListItemText-primary": {
    fontSize: "1rem",
  },
}));