import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  Stack,
  Divider,
  Alert,
  Slide,
  useTheme,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  itemId: string | number;
  itemName?: string;
  onDeleteSuccess: () => void;
  deleteApi: (id: string | number) => Promise<void>;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  itemId,
  itemName,
  onDeleteSuccess,
  deleteApi,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleDeleteConfirmed = async () => {
    setError(null);
    setLoading(true);
    try {
      await deleteApi(itemId);
      onDeleteSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
        },
      }}
      TransitionComponent={Slide}
    >
      {/* Decorative gradient header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff6a00, #ee0979)',
          color: '#fff',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '50px 50px',
            opacity: 0.1,
            animation: 'shimmer 2s linear infinite',
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '100% 100%' },
          },
        }}
      >
        <WarningAmberRoundedIcon sx={{ mr: 1, fontSize: 28, filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' }} />
        <Typography variant="h6" fontWeight="bold">
          Confirm Deletion
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box textAlign="center">
            <DeleteForeverRoundedIcon
              sx={{
                fontSize: 48,
                color: 'error.main',
                mb: 1,
                filter: 'drop-shadow(0 0 4px rgba(244,67,54,0.4))',
              }}
            />
            <Typography variant="h6" gutterBottom>
              Are you sure you want to delete <strong>{itemName || 'this item'}</strong>?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This action is <strong>permanent</strong> and cannot be undone.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            borderColor: 'grey.500',
            color: 'grey.800',
            '&:hover': {
              borderColor: 'grey.700',
              backgroundColor: 'grey.100',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteConfirmed}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <DeleteForeverRoundedIcon />}
          sx={{
            boxShadow: '0 0 10px rgba(244, 67, 54, 0.3)',
            '&:hover': {
              backgroundColor: '#c62828',
            },
          }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
