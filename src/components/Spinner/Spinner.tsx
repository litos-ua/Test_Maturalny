import { CircularProgress, Box, Typography } from "@mui/material";

interface SpinnerProps {
  message?: string;
  size?: number;
}

export const Spinner = ({ message = "Loading...", size = 40 }: SpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: "100vh",
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};