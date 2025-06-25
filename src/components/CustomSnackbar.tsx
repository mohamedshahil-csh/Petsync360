import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SyntheticEvent } from "react";
import { SnackbarCloseReason } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: "error" | "warning" | "info" | "success";  // dynamic severity
  onClose: (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => void;
}

export default function CustomSnackbar({
  open,
  message,
  severity = "info",   // default to info
  onClose,
}: CustomSnackbarProps) {
  // Set different loading bar colors based on severity:
  const loadingColors: Record<string, string> = {
    error: '#f44336',    // red
    success: '#4caf50',  // green
    warning: '#ff9800',  // orange
    info: '#2196f3',     // blue
  };

  const loadingLineStyle = {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    height: '4px',
    backgroundColor: loadingColors[severity],
    animation: 'loadingLine 2s linear forwards',
  };

  return (
    <>
      <style>
        {`
          @keyframes loadingLine {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}
        >
          {message}
          <div style={loadingLineStyle} />
        </Alert>
      </Snackbar>
    </>
  );
}
