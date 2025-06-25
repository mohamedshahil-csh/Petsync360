import { Box, Typography, Button } from '@mui/material';
import apiClient from '../../services/apiClient';
import { useEffect, useState } from 'react';
import DynamicTable from '../../components/Table/DataTable';
import { IconEdit, IconPlus, IconTrash } from '../../components/icons/icons';
import TablePaginationActions from '../../components/Table/tablePagination';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';
import ChargeCodeDialog from '../../Forms/ChargeCodeForms';

const ChargeCodeComponent = () => {
  // Pagination state
  const [page, setPage] = useState(0); // zero-based index for table
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Data & UI states
  const [loading, setLoading] = useState(true);
  const [chargeCodes, setChargeCodes] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<Record<number, string>>({});


  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChargeCode, setSelectedChargeCode] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chargeCodeToDelete, setChargeCodeToDelete] = useState<any>(null);

  // Effect to fetch data whenever page or rowsPerPage changes
  useEffect(() => {
    fetchChargeCodes();
  }, [page, rowsPerPage]);

  const fetchChargeCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await apiClient(
        `v1/resource/ChargeCode?page=${page + 1}&limit=${rowsPerPage}`,
        { method: 'GET' }
      );
      setChargeCodes(response.data.charge_codes);
      setTotalCount(response.data.pagination.total);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const response: any = await apiClient(`v1/resource/Provider`, { method: 'GET' });
      const providerMap: Record<number, string> = {};
      response.data.providers.forEach((provider: any) => {
        const user = provider.user;
        if (user) {
          providerMap[provider.id] = `${user.first_name} ${user.last_name}`;
        }
      });
      setProviders(providerMap);
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const columns = [
    {
      key: 'serial',
      label: 'S.No',
      align: 'center',
      render: (_row: any, index: number) => page * rowsPerPage + index + 1,
    },
    { key: 'veterinarian', label: 'Veterinarian', align: 'center', render: (row: any) => providers[row.provider_id] || 'N/A', },
    { key: 'service_type', label: 'Service Type', align: 'center', render: (row: any) => row?.service_type },
    { key: 'charge_code', label: 'Charge Code', align: 'center', render: (row: any) => row?.charge_code },
    { key: 'service_name', label: 'Service Name', align: 'center', render: (row: any) => row?.service_name ?? '-' },
    {
      key: 'amount',
      label: 'Amount',
      align: 'center',
      render: (row: any) => {
        if (row?.amount == null) return <Typography fontWeight="bold">N/A</Typography>;

        const amount = parseFloat(row.amount);
        const displayAmount = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);

        return (
          <Typography
            fontWeight="bold"
            sx={{
              background:
                amount > 0
                  ? 'linear-gradient(90deg, #4caf50, #81c784)'
                  : 'linear-gradient(90deg, #f44336, #e57373)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ₹{displayAmount}
          </Typography>
        );
      },
    },

    {
      key: 'tax',
      label: 'Tax',
      align: 'Left',
      render: (row: any) => {
        const baseAmount = parseFloat(row?.amount || '0');
        let taxDetails: { name: string; value: number; type: string }[] = [];

        try {
          const taxCodes = JSON.parse(row?.tax_codes || '[]').map((t: string) => JSON.parse(t));
          taxCodes.forEach((tax: any) => {
            const rate = parseFloat(tax.rate || '0');
            let value = 0;
            if (tax.type === 'percentage') {
              value = (baseAmount * rate) / 100;
            } else if (tax.type === 'adhoc') {
              value = rate;
            }
            taxDetails.push({ name: tax.name || tax.code, value, type: tax.type });
          });
        } catch (err) {
          console.error('Error parsing tax_codes:', err);
        }

        return (
          <Box>
            {taxDetails.length > 0 ? (
              taxDetails.map((tax, index) => (
                <Typography variant="body2" key={index}>
                  {tax.name} ({tax.type}): ₹{tax.value.toFixed(2)}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Tax
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      key: 'total_amount',
      label: 'Total Amount',
      align: 'center',
      render: (row: any) => {
        const totalAmount = parseFloat(row?.total_amount || '0');

        const displayAmount = Number.isInteger(totalAmount)
          ? totalAmount.toString()
          : totalAmount.toFixed(2);

        return (
          <Typography fontWeight="bold" color="primary">
            ₹{displayAmount}
          </Typography>
        );
      },
    }

  ];

  const confirmDelete = (id: string | number) => {
    const chargeCode = chargeCodes.find((c) => c.id === id);
    setChargeCodeToDelete(chargeCode || null);
    setDeleteDialogOpen(true);
  };

  const deleteChargeCodeApi = async (id: string | number) => {
    await apiClient(`v1/resource/ChargeCode/${id}`, { method: 'DELETE' });
  };

  const handleDeleteSuccess = () => {
    fetchChargeCodes();
    setChargeCodeToDelete(null);
    setDeleteDialogOpen(false);
  };

  const actions = [
    {
      label: 'Edit',
      color: '#4caf50',
      icon: <IconEdit size={20} />,
      onClick: (row: any) => {
        setSelectedChargeCode(row);
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

  const handleAddChargeCode = () => {
    setSelectedChargeCode(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedChargeCode(null);
  };

  const handleFormSuccess = () => {
    fetchChargeCodes();
    setDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setChargeCodeToDelete(null);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus size={20} />}
          onClick={handleAddChargeCode}
          sx={{ fontWeight: 'bold', borderRadius: 2 }}
        >
          Add Charge Code
        </Button>
      </Box>

      <DynamicTable
        columns={columns}
        data={chargeCodes}
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

      <ChargeCodeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
        initialData={selectedChargeCode}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        itemId={chargeCodeToDelete?.id}
        itemName={chargeCodeToDelete?.charge_code}
        deleteApi={deleteChargeCodeApi}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Box>
  );
};

export default ChargeCodeComponent;
