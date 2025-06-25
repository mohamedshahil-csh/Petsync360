import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, totalPages - 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <ChevronsLeft size={20} />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <ChevronLeft size={20} />
      </IconButton>

      <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
        Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
      </Typography>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="next page"
      >
        <ChevronRight size={20} />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="last page"
      >
        <ChevronsRight size={20} />
      </IconButton>
    </Box>
  );
};

export default TablePaginationActions;
