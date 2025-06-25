import { Box, Typography, Button } from '@mui/material';
import apiClient from '../../services/apiClient';
import { useEffect, useState } from 'react';
import DynamicTable from '../../components/Table/DataTable';
import { IconEdit, IconPlus, IconTrash } from '../../components/icons/icons';
import TablePaginationActions from '../../components/Table/tablePagination';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';
import TaxCodeDialog from '../../Forms/TaxCodeForms';

const TaxCodeComponent = () => {
  // Pagination state
  const [page, setPage] = useState(0); // zero-based index for table
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Data & UI states
  const [loading, setLoading] = useState(true);
  const [taxCodes, setTaxCodes] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTaxCode, setSelectedTaxCode] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taxCodeToDelete, setTaxCodeToDelete] = useState<any>(null);

  // Effect to fetch data whenever page or rowsPerPage changes
  useEffect(() => {
    fetchTaxCodes();
  }, [page, rowsPerPage]);

  const fetchTaxCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await apiClient(
        `v1/resource/taxCodes?page=${page + 1}&limit=${rowsPerPage}`,
        { method: 'GET' }
      );
      setTaxCodes(response.data.tax_codes);
      setTotalCount(response.data.pagination.total);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  

  const columns = [
    {
      key: 'serial',
      label: 'S.No',
      align: 'Left',
      render: (_row: any, index: number) => page * rowsPerPage + index + 1,
    },
    { key: 'code', label: 'Code', align: 'Left', render: (row: any) => row?.code },
    { key: 'name', label: 'Name', align: 'Left', render: (row: any) => row?.name },
    { key: 'type', label: 'Type', align: 'Left', render: (row: any) => row?.type ?? '-' },
    {
      key: 'rate',
      label: 'Rate',
      align: 'Left',
      render: (row: any) => {
        const rate = row?.rate;
        const type = row?.type;

        if (rate == null || isNaN(rate)) return 'N/A';

        // Format the rate: remove decimals if .00
        const formattedRate = parseFloat(rate) % 1 === 0 ? parseInt(rate) : parseFloat(rate).toFixed(2);

        let displayValue = '';
        if (type === 'percentage') {
          displayValue = `${formattedRate}%`;
        } else if (type === 'adhoc') {
          displayValue = `₹${formattedRate}`;
        } else {
          displayValue = `₹${formattedRate}`;
        }

        return (
          <Typography
            fontWeight="bold"
            sx={{
              background:
                rate > 0
                  ? 'linear-gradient(90deg, #4caf50, #81c784)'
                  : 'linear-gradient(90deg, #f44336, #e57373)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {displayValue}
          </Typography>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      align: 'Left',
      render: (row: any) => {
        const isActive = row?.status === 1;
        const label = isActive ? 'Active' : row?.status === 0 ? 'InActive' : '-';
        const bgColor = isActive ? 'success.light' : row?.status === 0 ? 'error.light' : 'grey.300';

        return (
          <Box px={1.5} py={0.5} borderRadius={8} bgcolor={bgColor} color="white" display="inline-block" fontSize={12} fontWeight="bold" textAlign="center">
            {label}
          </Box>
        );
      },
    }

  ];

  const confirmDelete = (id: string | number) => {
    const taxCode = taxCodes.find((c) => c.id === id);
    setTaxCodeToDelete(taxCode || null);
    setDeleteDialogOpen(true);
  };

  const deleteTaxCodeApi = async (id: string | number) => {
    await apiClient(`v1/resource/taxCodes/${id}`, { method: 'DELETE' });
  };

  const handleDeleteSuccess = () => {
    fetchTaxCodes();
    setTaxCodeToDelete(null);
    setDeleteDialogOpen(false);
  };

  const actions = [
    {
      label: 'Edit',
      color: '#4caf50',
      icon: <IconEdit size={20} />,
      onClick: (row: any) => {
        setSelectedTaxCode(row);
        setDialogOpen(true);
      },
    },
    {
      label: 'Delete',
      color: '#f44336',
      icon: <IconTrash size={20} />,
      onClick: (row: any) => confirmDelete(row.id),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleAddTaxCode = () => {
    setSelectedTaxCode(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedTaxCode(null);
  };

  const handleFormSuccess = () => {
    fetchTaxCodes();
    setDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTaxCodeToDelete(null);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus size={20} />}
          onClick={handleAddTaxCode}
          sx={{ fontWeight: 'bold', borderRadius: 2 }}
        >
          Add Tax Code
        </Button>
      </Box>

      <DynamicTable
        columns={columns}
        data={taxCodes}
        loading={loading}
        actions={actions}
        page={page}
        error={error}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
      />

      <TaxCodeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
        initialData={selectedTaxCode}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        itemId={taxCodeToDelete?.id}
        itemName={`${taxCodeToDelete?.code}-${taxCodeToDelete?.name}`}
        deleteApi={deleteTaxCodeApi}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Box>
  );
};

export default TaxCodeComponent;
