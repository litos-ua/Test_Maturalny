import React, { Component } from "react";
import type { ReactNode } from 'react';
import { Button, Typography, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../router";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

// Заглушка для ErrorComponent, если ты не показал его:
const ErrorComponent = ({
  error,
  errorInfo,
}: {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" color="error">
        Something has gone wrong!
      </Typography>
      {error && <Typography variant="body1">{error.message}</Typography>}
      <Button
        variant="contained"
        onClick={() => navigate(ROUTE.HOME)}
        sx={{ mt: 2 }}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
};
