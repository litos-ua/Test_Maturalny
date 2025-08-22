import type { SxProps, Theme } from "@mui/material";

export const resultsWrapper: SxProps<Theme> = {
  mt: 4,
};

export const headerPaper: SxProps<Theme> = (theme) => ({
  display: "flex",
  p: 1.5,
  fontWeight: "bold",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `2px solid ${theme.palette.divider}`,
});

export const rowPaper: SxProps<Theme> = (theme) => ({
  display: "flex",
  p: 1.5,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
});

export const cell: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  alignItems: "center",
};

export const dialogTitle: SxProps<Theme> = {
  position: "relative",
  fontWeight: 600,
};

export const questionBox: SxProps<Theme> = (theme) => ({
  mb: 2,
  p: 1.5,
  borderRadius: 2,
  backgroundColor: theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.grey[100],
});

export const pagination = {
  '& .MuiPaginationItem-root': {
    color: 'text.primary',
  },
  '& .Mui-selected': {
    fontWeight: 'bold',
  },
};
